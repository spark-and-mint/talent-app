export type INewMember = {
  email: string
  password: string
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
  status: "form completed" | "1on1 done" | "accepted" | "rejected" | null
  avatarUrl: string
  avatarId: string
  contractSigned: boolean
  profile: IProfile
  projects: IProject[]
}

export type IUpdateMember = {
  memberId: string
  email: string
  firstName: string
  lastName: string
  emailVerification?: boolean
  importedAnswers?: boolean
  file: File[]
  avatarId: string
  avatarUrl?: URL | string
  timezone?: string | null
  status?: "form completed" | "1on1 done" | "accepted" | "rejected" | null
  contractSigned?: boolean
  profile?: IProfile
  projects?: IProject[]
}

export type IProfile = {
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

export type INewProject = {
  clientId: string
  title: string
}

export type IProject = {
  projectId: string
  title: string
  members?: IMember[]
}

export type INewMilestone = {
  projectId: string
  title: string
}

export type IMilestone = {
  milestoneId: string
  title: string
  updates?: IUpdate[]
  status?: "in progress" | "approved"
}

export type INewUpdate = {
  memberId: string
  milestoneId: string
  title: string
  type?: string
  link?: string
  file?: File[]
  description?: string
}

export type IUpdate = {
  updateId: string
  title: string
  type?: string
  link?: string
  file?: File[]
  description?: string
}

export type INewFeedback = {
  updateId: string
  text: string
}

export type IFeedback = {
  feedbackId: string
  text: string
}
