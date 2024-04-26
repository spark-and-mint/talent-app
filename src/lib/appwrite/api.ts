import { ID, Models, Query } from "appwrite"
import { appwriteConfig, account, databases, storage, avatars } from "./config"
import {
  IFeedback,
  IMilestone,
  INewMember,
  INewUpdate,
  IOpportunity,
  IProject,
  IUpdate,
  IUpdateMember,
} from "@/types"
import { nanoid } from "nanoid"

export async function createMemberAccount(member: INewMember) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      member.email,
      member.password,
      `${member.firstName} ${member.lastName}`
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(
      `${member.firstName} ${member.lastName}`
    )

    const newMember = await saveMemberToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: `${member.firstName} ${member.lastName}`,
      firstName: member.firstName,
      lastName: member.lastName,
      avatarUrl,
    })

    return newMember
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function saveMemberToDB(member: {
  accountId: string
  email: string
  name: string
  firstName: string
  lastName: string
  avatarUrl: URL
}) {
  try {
    const newProfile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      ID.unique(),
      {
        memberId: member.accountId,
      }
    )

    const newMember = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.memberCollectionId,
      ID.unique(),
      {
        ...member,
        avatarId: nanoid(),
        profileId: newProfile.$id,
      }
    )

    return newMember
  } catch (error) {
    console.log(error)
  }
}

export async function signInAccount(member: {
  email: string
  password: string
}) {
  try {
    const session = await account.createEmailSession(
      member.email,
      member.password
    )
    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getCurrentMember() {
  try {
    const currentAccount = await getAccount()

    if (!currentAccount) throw Error

    const currentMember = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.memberCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )

    if (!currentMember) throw Error

    const profile = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      currentMember.documents[0].profileId
    )

    if (!profile) throw Error

    const member = {
      ...currentMember.documents[0],
      profile: {
        ...profile,
      },
    }

    return { member, error: null }
  } catch (error) {
    console.log(error)
    return { member: null, error }
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get()
    return currentAccount
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current")
    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getMembers() {
  const members = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.memberCollectionId
  )

  if (!members) throw Error

  return members
}

export async function getMemberById(memberId: string) {
  try {
    const member = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.memberCollectionId,
      memberId
    )

    if (!member) throw Error

    return member
  } catch (error) {
    console.log(error)
  }
}

export async function updateMember(member: IUpdateMember) {
  const hasFileToUpdate = member.file.length > 0
  try {
    let avatar = {
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
    }

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(member.file[0])
      if (!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }

      avatar = { ...avatar, avatarUrl: fileUrl, avatarId: uploadedFile.$id }
    }

    const updatedMemberResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.memberCollectionId,
      member.memberId,
      {
        importedAnswers: member.importedAnswers,
        emailVerification: member.emailVerification,
        email: member.email,
        firstName: member.firstName,
        lastName: member.lastName,
        status: member.status,
        contractSigned: member.contractSigned,
        timezone: member.timezone,
        profileId: member.profileId,
        projects: member.projects,
        avatarUrl: avatar.avatarUrl,
        avatarId: avatar.avatarId,
      }
    )

    const updatedProfileResponse = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.profileCollectionId,
      member.profileId,
      {
        workStatus: member.profile?.workStatus,
        seniority: member.profile?.seniority,
        roles: member.profile?.roles,
        skills: member.profile?.skills,
        domains: member.profile?.domains,
        lookingFor: member.profile?.lookingFor,
        availability: member.profile?.availability,
        rate: member.profile?.rate,
        website: member.profile?.website,
        linkedin: member.profile?.linkedin,
        github: member.profile?.github,
        x: member.profile?.x,
        farcaster: member.profile?.farcaster,
        dribbble: member.profile?.dribbble,
        behance: member.profile?.behance,
      }
    )

    if (!updatedMemberResponse || !updatedProfileResponse) {
      if (hasFileToUpdate) {
        await deleteFile(avatar.avatarId)
      }
      throw Error
    }

    if (member.avatarId && hasFileToUpdate) {
      await deleteFile(member.avatarId)
    }

    const updatedMember = {
      ...updatedMemberResponse,
      profile: {
        workStatus: updatedProfileResponse.workStatus,
        seniority: updatedProfileResponse.seniority,
        roles: updatedProfileResponse.roles,
        skills: updatedProfileResponse.skills,
        domains: updatedProfileResponse.domains,
        lookingFor: updatedProfileResponse.lookingFor,
        availability: updatedProfileResponse.availability,
        rate: updatedProfileResponse.rate,
        website: updatedProfileResponse.website,
        linkedin: updatedProfileResponse.linkedin,
        github: updatedProfileResponse.github,
        x: updatedProfileResponse.x,
        farcaster: updatedProfileResponse.farcaster,
        dribbble: updatedProfileResponse.dribbble,
        behance: updatedProfileResponse.behance,
      },
    }

    return updatedMember
  } catch (error) {
    console.log(error)
  }
}

export async function getClients() {
  const clients = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.clientCollectionId
  )

  if (!clients) throw Error

  return clients
}

export async function getClientById(clientId?: string) {
  if (!clientId) throw Error

  try {
    const client = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId
    )

    if (!client) throw Error

    return client
  } catch (error) {
    console.log(error)
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}

export function getFileView(fileId: string) {
  try {
    const fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      400,
      400
    )

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)
    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}

export async function getTypeFormAnswersByEmail(email: string) {
  if (!email) throw Error("Email can't be empty")

  try {
    const response = await fetch(
      `https://spectacular-sprite-2804c0.netlify.app/.netlify/functions/formResponses?email=${email}`
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`An error occurred: ${error}`)
    return error
  }
}

export async function createUpdate(update: INewUpdate) {
  try {
    let fileUrl
    let fileName
    let uploadedFile

    if (update.file[0]) {
      uploadedFile = await uploadFile(update.file[0])

      if (!uploadedFile) throw Error

      fileUrl = getFileView(uploadedFile.$id)
      fileName = uploadedFile.name

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }
    }

    const newUpdate = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      ID.unique(),
      {
        creatorId: update.memberId,
        milestoneId: update.milestoneId,
        title: update.title,
        type: update.type,
        link: update.link,
        description: update.description,
        fileId: uploadedFile ? uploadedFile.$id : nanoid(),
        fileName,
        fileUrl,
      }
    )

    if (!newUpdate && uploadedFile) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }

    return newUpdate
  } catch (error) {
    console.log(error)
  }
}

export async function updateUpdate(update: IUpdate) {
  const hasFileToUpdate = update.file.length > 0

  try {
    let file = {
      fileName: update.fileName,
      fileUrl: update.fileUrl,
      fileId: update.fileId,
    }

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(update.file[0])
      if (!uploadedFile) throw Error

      const fileUrl = getFileView(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }

      file = {
        ...file,
        fileName: uploadedFile.name,
        fileUrl: fileUrl,
        fileId: uploadedFile.$id,
      }
    }

    const updatedUpdate = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      update.updateId,
      {
        title: update.title,
        type: update.type,
        link: update.link,
        description: update.description,
        fileName: file.fileName,
        fileUrl: file.fileUrl,
        fileId: file.fileId,
      }
    )

    if (!updatedUpdate) {
      throw Error
    }

    return updatedUpdate
  } catch (error) {
    console.log(error)
  }
}

export async function deleteUpdate(updateId?: string, milestoneId?: string) {
  if (!updateId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      updateId
    )

    if (!statusCode) throw Error

    return { status: "Ok", updateId, milestoneId }
  } catch (error) {
    console.log(error)
  }
}

export async function getMemberUpdates(memberId?: string) {
  if (!memberId) return

  try {
    const update = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      [Query.equal("creator", memberId), Query.orderDesc("$createdAt")]
    )

    if (!update) throw Error

    return update
  } catch (error) {
    console.log(error)
  }
}

export async function getMemberOpportunities(memberId?: string) {
  if (!memberId) return

  try {
    const opportunities = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      [Query.equal("memberId", memberId)]
    )

    if (!opportunities) throw Error

    return opportunities
  } catch (error) {
    console.log(error)
  }
}

export async function updateOpportunity(opportunity: IOpportunity) {
  if (!opportunity) return

  try {
    const updatedOpportunity = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      opportunity.opportunityId,
      {
        status: opportunity.status,
      }
    )

    if (!updatedOpportunity) {
      throw Error
    }

    return updatedOpportunity
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectTeam(projectId?: string) {
  if (!projectId) throw Error("Invalid project ID or member IDs")

  try {
    const opportunities = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      [Query.equal("projectId", projectId)]
    )

    const acceptedOpportunities = opportunities.documents.filter(
      (opportunity) => opportunity.status === "accepted"
    )

    const teamMembers = await Promise.all(
      acceptedOpportunities.map(async (opportunity) => {
        const memberDetails = await databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.memberCollectionId,
          opportunity.memberId
        )

        return {
          id: opportunity.memberId,
          firstName: memberDetails.firstName,
          lastName: memberDetails.lastName,
          avatarUrl: memberDetails.avatarUrl,
          role: opportunity.role || "Team member",
        }
      })
    )

    return teamMembers
  } catch (error) {
    console.error("Failed to fetch project team: ", error)
    throw new Error("Error fetching project team")
  }
}

export async function getMemberProjects(memberId?: string) {
  if (!memberId) return

  try {
    const projects = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId
    )

    if (!projects) throw Error

    const memberProjects = projects.documents.filter(
      (project: Models.Document) =>
        project.team.some((id: string) => id === memberId)
    )

    return memberProjects
  } catch (error) {
    console.log(error)
  }
}

export async function updateProject(project: IProject) {
  if (!project) return

  try {
    const updatedProject = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      project.projectId,
      {
        title: project.title,
        team: project.team,
      }
    )

    if (!updatedProject) {
      throw Error
    }

    return updatedProject
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectById(projectId?: string) {
  if (!projectId) throw Error

  try {
    const project = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectCollectionId,
      projectId
    )

    if (!project) throw Error

    return project
  } catch (error) {
    console.log(error)
  }
}

export async function getProjectMilestones(projectId?: string) {
  if (!projectId) return

  try {
    const milestones = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId
    )

    if (!milestones) throw Error

    const projectMilestones = milestones.documents.filter(
      (milestone: Models.Document) => milestone.projectId === projectId
    )

    return projectMilestones
  } catch (error) {
    console.log(error)
  }
}

export async function getMilestoneById(milestoneId?: string) {
  if (!milestoneId) throw Error

  try {
    const milestone = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      milestoneId
    )

    if (!milestone) throw Error

    return milestone
  } catch (error) {
    console.log(error)
  }
}

export async function updateMilestone(milestone: IMilestone) {
  try {
    const updatedMilestone = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.milestoneCollectionId,
      milestone.milestoneId,
      {
        title: milestone.title,
        status: milestone.status,
      }
    )

    if (!updatedMilestone) {
      throw Error
    }

    return updatedMilestone
  } catch (error) {
    console.log(error)
  }
}

export async function updateFeedback(feedback: IFeedback) {
  try {
    const updatedFeedback = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId,
      feedback.feedbackId,
      {
        text: feedback.text,
        viewedBy: feedback.viewedBy,
      }
    )

    if (!updatedFeedback) {
      throw Error
    }

    return updatedFeedback
  } catch (error) {
    console.log(error)
  }
}

export async function getMilestoneUpdates(milestoneId?: string) {
  if (!milestoneId) return

  try {
    const updates = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId
    )

    if (!updates) throw Error

    const milestoneUpdates = updates.documents.filter(
      (update: Models.Document) => update.milestoneId === milestoneId
    )

    return milestoneUpdates
  } catch (error) {
    console.log(error)
  }
}

export async function getUpdateFeedback(updateId?: string) {
  if (!updateId) return

  try {
    const feedback = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.feedbackCollectionId
    )

    if (!feedback) throw Error

    const feedbackUpdate = feedback.documents.filter(
      (feedback: Models.Document) => feedback.updateId === updateId
    )

    return feedbackUpdate
  } catch (error) {
    console.log(error)
  }
}
