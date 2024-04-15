import {
  IClient,
  IFeedback,
  IMilestone,
  INewClient,
  INewMember,
  INewUpdate,
  IOpportunity,
  IProject,
  IUpdate,
  IUpdateMember,
} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createClient,
  createMemberAccount,
  createUpdate,
  deleteClient,
  deleteUpdate,
  getClientById,
  getClients,
  getMemberById,
  getMemberOpportunity,
  getMemberProjects,
  getMemberUpdates,
  getMembers,
  getMilestoneById,
  getProjectById,
  getTypeFormAnswersByEmail,
  signInAccount,
  signOutAccount,
  updateClient,
  updateFeedback,
  updateMember,
  updateMilestone,
  updateOpportunity,
  updateProject,
  updateUpdate,
} from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"
import { useParams } from "react-router-dom"

export const useCreateMemberAccount = () => {
  return useMutation({
    mutationFn: (member: INewMember) => createMemberAccount(member),
  })
}

export const useCreateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (client: INewClient) => createClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
    },
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

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (client: IClient) => updateClient(client),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENT_BY_ID, data?.$id],
      })
    },
  })
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ clientId, logoId }: { clientId?: string; logoId: string }) =>
      deleteClient(clientId, logoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
    },
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
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, data?.milestone.$id],
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
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID, data?.milestone.$id],
      })
    },
  })
}

export const useDeleteUpdate = () => {
  const queryClient = useQueryClient()
  const { projectId } = useParams()
  return useMutation({
    mutationFn: ({ updateId }: { updateId?: string }) => deleteUpdate(updateId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
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

export const useGetMemberOpportunity = (memberId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITY, memberId],
    queryFn: () => getMemberOpportunity(memberId),
    enabled: !!memberId,
  })
}

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (opportunity: IOpportunity) => updateOpportunity(opportunity),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBER_OPPORTUNITY, data?.member.$id],
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

export const useUpdateFeedback = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (feedback: IFeedback) => updateFeedback(feedback),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MILESTONE_BY_ID],
      })
    },
  })
}
