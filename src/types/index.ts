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
  avatarUrl: string
  avatarId: string
  primaryRole: string
  seniority: string
  workStatus: string
  rate: string
  timezone: string
  availability: string
  website: string
  linkedin: string
  skills: string[]
  domains: string[]
  clients: IClient[]
  contractSigned: boolean
  applicationStatus: "form completed" | "1on1 done" | "accepted" | "rejected"
  meeting: string
}

export type IUpdateMember = {
  memberId: string
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  primaryRole?: string | null
  seniority?: string | null
  workStatus?: string | null
  rate?: string | null
  timezone?: string | null
  availability?: string | null
  website?: string | null
  linkedin?: string | null
  skills?: string[] | null
  domains?: string[] | null
  meeting?: string | null
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

export type IOption = {
  label: string
  value: string
}
