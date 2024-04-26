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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createMemberAccount,
  createUpdate,
  deleteUpdate,
  getClientById,
  getClients,
  getMemberById,
  getMemberOpportunities,
  getMemberProjects,
  getMemberUpdates,
  getMembers,
  getMilestoneById,
  getMilestoneUpdates,
  getProjectById,
  getProjectMilestones,
  getProjectTeam,
  getTypeFormAnswersByEmail,
  getUpdateFeedback,
  signInAccount,
  signOutAccount,
  updateFeedback,
  updateMember,
  updateMilestone,
  updateOpportunity,
  updateProject,
  updateUpdate,
} from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"

export const useCreateMemberAccount = () => {
  return useMutation({
    mutationFn: (member: INewMember) => createMemberAccount(member),
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (member: { email: string; password: string }) =>
      signInAccount(member),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  })
}

export const useGetMemberById = (memberId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_BY_ID, memberId],
    queryFn: () => getMemberById(memberId),
    enabled: !!memberId,
  })
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (member: IUpdateMember) => updateMember(member),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_MEMBER],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBER_BY_ID, data?.$id],
      })
    },
  })
}

export const useGetMembers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBERS],
    queryFn: getMembers,
  })
}

export const useGetClients = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENTS],
    queryFn: getClients,
  })
}

export const useGetClientById = (clientId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, clientId],
    queryFn: () => getClientById(clientId),
    enabled: !!clientId,
  })
}

export const useGetTypeFormAnswersByEmail = (
  email: string,
  importedAnswers: boolean
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TYPEFORM_ANSWERS_BY_EMAIL, email],
    queryFn: () => getTypeFormAnswersByEmail(email),
    enabled: !importedAnswers,
  })
}

export const useCreateUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: INewUpdate) => createUpdate(update),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_UPDATES, data?.milestoneId],
      })
    },
  })
}

export const useUpdateUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: IUpdate) => updateUpdate(update),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UPDATE_BY_ID, data?.$id],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_UPDATES, data?.milestoneId],
      })
    },
  })
}

export const useDeleteUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ updateId }: { updateId?: string }) => deleteUpdate(updateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_UPDATES],
      })
    },
  })
}

export const useGetMemberUpdates = (memberId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_UPDATES, memberId],
    queryFn: () => getMemberUpdates(memberId),
    enabled: !!memberId,
  })
}

export const useGetMemberOpportunities = (memberId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITIES, memberId],
    queryFn: () => getMemberOpportunities(memberId),
    enabled: !!memberId,
  })
}

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (opportunity: IOpportunity) => updateOpportunity(opportunity),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITIES, data?.memberId],
      })
    },
  })
}

export const useGetMemberProjects = (memberId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_PROJECTS, memberId],
    queryFn: () => getMemberProjects(memberId),
    enabled: !!memberId,
  })
}

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: (project: IProject) => updateProject(project),
  })
}

export const useGetProjectById = (projectId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  })
}

export const useGetMilestoneById = (milestoneId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, milestoneId],
    queryFn: () => getMilestoneById(milestoneId),
    enabled: !!milestoneId,
  })
}

export const useUpdateMilestone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (milestone: IMilestone) => updateMilestone(milestone),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, data?.$id],
      })
    },
  })
}

export const useGetUpdateFeedback = (updateId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_UPDATE_FEEDBACK, updateId],
    queryFn: () => getUpdateFeedback(updateId),
    enabled: !!updateId,
  })
}

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (feedback: IFeedback) => updateFeedback(feedback),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_UPDATE_FEEDBACK, data?.updateId],
      })
    },
  })
}

export const useGetProjectTeam = (projectId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_TEAM, projectId],
    queryFn: () => getProjectTeam(projectId),
    enabled: !!projectId,
  })
}

export const useGetProjectMilestones = (projectId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_MILESTONES, projectId],
    queryFn: () => getProjectMilestones(projectId),
    enabled: !!projectId,
  })
}

export const useGetMilestoneUpdates = (milestoneId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MILESTONE_UPDATES, milestoneId],
    queryFn: () => getMilestoneUpdates(milestoneId),
    enabled: !!milestoneId,
  })
}
