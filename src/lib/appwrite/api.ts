import { ID, Query } from "appwrite"
import { appwriteConfig, account, databases, storage, avatars } from "./config"
import {
  IClient,
  IMember,
  INewClient,
  INewMember,
  INewUpdate,
  IUpdate,
  IUpdateMember,
} from "@/types"

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
        avatarId: ID.unique(),
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
        workStatus: profile.workStatus,
        seniority: profile.seniority,
        roles: profile.roles,
        skills: profile.skills,
        domains: profile.domains,
        lookingFor: profile.lookingFor,
        availability: profile.availability,
        rate: profile.rate,
        website: profile.website,
        linkedin: profile.linkedin,
        github: profile.github,
        x: profile.x,
        farcaster: profile.farcaster,
        dribbble: profile.dribbble,
        behance: profile.behance,
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
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        status: member.status,
        timezone: member.timezone,
        avatarUrl: avatar.avatarUrl,
        avatarId: avatar.avatarId,
        contractSigned: member.contractSigned,
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

export async function createClient(client: INewClient) {
  try {
    let logoUrl
    let uploadedFile

    if (client.file[0]) {
      uploadedFile = await uploadFile(client.file[0])

      if (!uploadedFile) throw Error

      logoUrl = getFilePreview(uploadedFile.$id)
      if (!logoUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }
    } else {
      logoUrl = avatars.getInitials(client.name)
    }

    const newClient = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      ID.unique(),
      {
        name: client.name,
        logoId: uploadedFile ? uploadedFile.$id : ID.unique(),
        logoUrl,
      }
    )

    if (!newClient && uploadedFile) {
      await deleteFile(uploadedFile.$id)
      throw Error
    }

    return newClient
  } catch (error) {
    console.log(error)
  }
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

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000
    )

    if (!fileUrl) throw Error

    return fileUrl
  } catch (error) {
    console.log(error)
  }
}

export async function updateClient(client: IClient) {
  const hasFileToUpdate = client.file.length > 0

  try {
    let logo = {
      logoUrl: client.logoUrl,
      logoId: client.logoId,
    }

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(client.file[0])
      if (!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id)
        throw Error
      }

      logo = { ...logo, logoUrl: fileUrl, logoId: uploadedFile.$id }
    }

    const updatedClient = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      client.id,
      {
        name: client.name,
        description: client.description,
        resources: client.resources,
        logoUrl: logo.logoUrl,
        logoId: logo.logoId,
      }
    )

    if (!updatedClient) {
      if (hasFileToUpdate) {
        await deleteFile(logo.logoId)
      }

      throw Error
    }

    if (hasFileToUpdate) {
      await deleteFile(client.logoId)
    }

    return updatedClient
  } catch (error) {
    console.log(error)
  }
}

export async function assignMemberToClient(
  clientId: string,
  memberArray: IMember[]
) {
  try {
    const updatedClient = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId,
      {
        members: memberArray,
      }
    )

    if (!updatedClient) throw Error

    return updatedClient
  } catch (error) {
    console.log(error)
  }
}

export async function deleteClient(clientId?: string, logoId?: string) {
  if (!clientId || !logoId) return

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      clientId
    )

    if (!statusCode) throw Error

    await deleteFile(logoId)

    return { status: "Ok" }
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
    const newUpdate = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      ID.unique(),
      {
        title: update.title,
      }
    )

    return newUpdate
  } catch (error) {
    console.log(error)
  }
}

export async function updateUpdate(update: IUpdate) {
  try {
    const updatedUpdate = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.updateCollectionId,
      update.updateId,
      {
        title: update.title,
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

export async function getMemberOpportunity(memberId?: string) {
  if (!memberId) return

  try {
    const opportunity = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.opportunityCollectionId,
      [Query.equal("member", memberId)]
    )

    if (!opportunity) throw Error

    return opportunity
  } catch (error) {
    console.log(error)
  }
}
