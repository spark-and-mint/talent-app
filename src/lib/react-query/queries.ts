import {
  IClient,
  IMember,
  INewClient,
  INewMember,
  INewUpdate,
  IUpdate,
  IUpdateMember,
} from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  assignMemberToClient,
  createClient,
  createMemberAccount,
  createUpdate,
  deleteClient,
  getClientById,
  getClients,
  getMemberById,
  getMemberUpdates,
  getMembers,
  getTypeFormAnswersByEmail,
  signInAccount,
  signOutAccount,
  updateClient,
  updateMember,
  updateUpdate,
} from "../appwrite/api"
import { QUERY_KEYS } from "./queryKeys"

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

export const useAssignMemberToClient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      clientId,
      memberArray,
    }: {
      clientId: string
      memberArray: IMember[]
      addMember: boolean
    }) => assignMemberToClient(clientId, memberArray),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CLIENTS],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBERS],
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

export const useGetTypeFormAnswersByEmail = (email: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_TYPEFORM_ANSWERS_BY_EMAIL, email],
    queryFn: () => getTypeFormAnswersByEmail(email),
  })
}

// ============================================================
// UPDATE QUERIES
// ============================================================

export const useCreateUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (update: INewUpdate) => createUpdate(update),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_MEMBER_UPDATES],
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

// export const useGetUpdatesByProject = (projectId?: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_UPDATES_BY_PROJECT, projectId],
//     queryFn: () => getProjectUpdates(projectId),
//     enabled: !!projectId,
//   })
// }

// export const useDeleteUpdate = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: ({ updateId }: { updateId?: string }) => deleteUpdate(updateId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_UPDATES],
//       })
//     },
//   })
// }
