import { Loader } from "@/components/shared"
import { checkIfUserExists, createOAuthMemberAccount } from "@/lib/appwrite/api"
import { account } from "@/lib/appwrite/config"
import { useEffect, useRef } from "react"
import human from "humanparser"
import { useNavigate } from "react-router-dom"
import { useMemberContext } from "@/context/AuthContext"
import { toast } from "sonner"

const OAuth2Callback = () => {
  const { checkAuthMember } = useMemberContext()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  useEffect(() => {
    const handleOAuth2Callback = async () => {
      try {
        const session = await account.getSession("current")
        const userId = session.userId
        const accessToken = session.providerAccessToken
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch user info from Google")
        }

        const userInfo = await response.json()
        const { email, name } = userInfo
        const existingUser = await checkIfUserExists(email)

        if (existingUser) {
          const isLoggedIn = await checkAuthMember()

          if (isLoggedIn) {
            navigate("/")
          } else {
            toast.error("Login failed. Please try again.")
            return
          }
        } else {
          const { firstName, lastName } = human.parseName(name)

          const member = {
            firstName: firstName || name,
            lastName: lastName || "n/a",
            email,
          }

          const newMember = await createOAuthMemberAccount(member, userId)

          if (!newMember) {
            toast.error("Sign up failed. Please try again.")
            return
          }

          const isLoggedIn = await checkAuthMember()

          if (isLoggedIn) {
            navigate("/")
          } else {
            toast.error("Login failed. Please try again.")
            return
          }
        }
      } catch (error) {
        console.error(error)
        navigate("/sign-in")
      }
    }

    if (!isMounted.current) {
      handleOAuth2Callback()
      isMounted.current = true
    }
  }, [navigate, checkAuthMember])

  return (
    <div className="h-screen -mt-48">
      <Loader />
    </div>
  )
}

export default OAuth2Callback
