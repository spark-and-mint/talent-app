export type INewMember = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type INewOAuthMember = {
  email: string
  firstName: string
  lastName: string
}

export type IMember = {
  id: string
  email: string
  firstName: string
  lastName: string
  emailVerification: boolean
  importedAnswers: boolean
  name: string
  timezone: string
  status:
    | "in review"
    | "1on1 done"
    | "invite shared"
    | "accepted"
    | "rejected"
    | null
  profileId: string
  profile: {
    workStatus: string
    seniority: string
    rate: string
    roles: string[]
    skills: string[]
    domains: string[]
    availability: string
    lookingFor: string
    website: string
    linkedin: string
    github: string
    x: string
    farcaster: string
    dribbble: string
    behance: string
  }
  avatarUrl: string
  avatarId: string
  contractSigned: boolean
  projects: IProject[]
}

export type IUpdateMember = {
  memberId: string
  email: string
  firstName: string
  lastName: string
  file: File[]
  avatarId: string
  profileId: string
  profile: {
    workStatus?: string
    seniority?: string
    rate?: string
    roles?: string[]
    skills?: string[]
    domains?: string[]
    availability?: string
    lookingFor?: string
    website?: string
    linkedin?: string
    github?: string
    x?: string
    farcaster?: string
    dribbble?: string
    behance?: string
  }
  importedAnswers?: boolean
  emailVerification?: boolean
  avatarUrl?: URL | string
  timezone?: string | null
  status?: "in review" | "1on1 done" | "accepted" | "rejected" | null
  contractSigned?: boolean
  projects?: IProject[]
}

export type INewClient = {
  name: string
  file: File[]
}

export type IClient = {
  id: string
  name: string
  logoUrl: URL | string
  logoId: string
  file: File[]
  description?: string
  members?: IMember[]
  resources?: IResource[]
  projects?: IProject[]
}

export type IResource = {
  title: string
  link: string
  type: "design" | "document" | "other"
}

export type IOption = {
  label: string
  value: string
  [key: string]: string | boolean | undefined
}

export type IProject = {
  projectId: string
  title: string
  briefLink?: string
  additionalLink?: string
  sparkRep?: IMember
  status?: string
  client?: IClient
  team?: IMember[] | null
}

export type IOpportunity = {
  opportunityId: string
  status?: string
  role?: string
  background?: string
  description?: string
  duration?: string
  type?: string
  estimatedEarnings?: string
  responsibilities?: string
}

export type INewMilestone = {
  projectId: string
  title: string
}

export type IMilestone = {
  milestoneId: string
  title: string
  updates?: IUpdate[]
  project?: IProject
  status?: "in progress" | "approval requested" | "approved"
}

export type INewUpdate = {
  memberId: string
  milestoneId: string
  title: string
  type?: string
  link?: string
  file: File[]
  description?: string
}

export type IUpdate = {
  updateId: string
  title: string
  type?: string
  link?: string
  file: File[]
  fileId: string
  fileUrl: URL | string
  fileName: string
  description?: string
  isViewed?: boolean
  milestone?: IMilestone
  creator?: IMember
  feedback?: IFeedback
}

export type INewFeedback = {
  updateId: string
  text: string
}

export type IFeedback = {
  feedbackId: string
  text?: string
  viewedBy?: string[]
}
