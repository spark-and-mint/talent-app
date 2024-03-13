export type INewMember = {
  email: string
  password: string
  firstName: string
  lastName: string
  file: File[]
  primaryRole: string
}

export type IMember = {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl: string
  avatarId: string
  primaryRole: string
  seniority: string
  workStatus: string
  rate: string
  timezone?: string
  skills: ISkill[]
  clients: IClient[]
  contractSigned: boolean
  applicationStatus: "form completed" | "1on1 done" | "accepted" | "rejected"
}

export type IUpdateMember = {
  memberId: string
  firstName?: string
  lastName?: string
  email?: string
  primaryRole?: string
  seniority?: string
  workStatus?: string
  rate?: string
  timezone?: string
  skills?: ISkill[]
  avatarUrl?: URL | string
  avatarId: string
  file: File[]
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
}

export type IResource = {
  title: string
  link: string
  type: "design" | "document" | "other"
}

export type ISkill = {
  label: string
  value: string
}
