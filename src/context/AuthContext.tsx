import { useNavigate } from "react-router-dom"
import { createContext, useContext, useEffect, useState } from "react"

import { IMember } from "@/types"
import { getCurrentMember } from "@/lib/appwrite/api"

export const INITIAL_MEMBER: IMember = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatarUrl: "",
  avatarId: "",
  primaryRole: "",
  seniority: "",
  workStatus: "",
  rate: "",
  timezone: "",
  availability: "",
  website: "",
  linkedin: "",
  skills: [],
  domains: [],
  clients: [],
  contractSigned: false,
  applicationStatus: "form completed",
  meeting: "",
}

const INITIAL_STATE = {
  member: INITIAL_MEMBER,
  isLoading: false,
  isAuthenticated: false,
  setMember: () => {},
  setIsAuthenticated: () => {},
  checkAuthMember: async () => false as boolean,
}

type IContextType = {
  member: IMember
  isLoading: boolean
  setMember: React.Dispatch<React.SetStateAction<IMember>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  checkAuthMember: () => Promise<boolean>
}

const AuthContext = createContext<IContextType>(INITIAL_STATE)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [member, setMember] = useState<IMember>(INITIAL_MEMBER)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const checkAuthMember = async () => {
    setIsLoading(true)

    try {
      const currentAccount = await getCurrentMember()

      if (currentAccount) {
        setMember({
          id: currentAccount.$id,
          firstName: currentAccount.firstName,
          lastName: currentAccount.lastName,
          email: currentAccount.email,
          avatarUrl: currentAccount.avatarUrl,
          avatarId: currentAccount.avatarId,
          primaryRole: currentAccount.primaryRole,
          seniority: currentAccount.seniority,
          workStatus: currentAccount.workStatus,
          rate: currentAccount.rate,
          timezone: currentAccount.timezone,
          skills: currentAccount.skills,
          domains: currentAccount.domains,
          clients: currentAccount.clients,
          linkedin: currentAccount.linkedin,
          availability: currentAccount.availability,
          website: currentAccount.website,
          contractSigned: currentAccount.contractSigned,
          applicationStatus: currentAccount.applicationStatus,
          meeting: currentAccount.meeting,
        })
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback")
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in")
    }

    checkAuthMember()
  }, [])

  const value = {
    member,
    setMember,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthMember,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useMemberContext = () => useContext(AuthContext)
