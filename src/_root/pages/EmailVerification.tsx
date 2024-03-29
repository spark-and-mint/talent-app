import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { account } from "@/lib/appwrite/config"
import { MailIcon } from "lucide-react"
import { useMemberContext } from "@/context/AuthContext"
import { toast } from "sonner"
import { useUpdateMember } from "@/lib/react-query/queries"

const EmailVerification = () => {
  const navigate = useNavigate()
  const { member, setMember } = useMemberContext()
  const { mutateAsync: updateMember } = useUpdateMember()
  const [searchParams] = useSearchParams()
  const secret = searchParams.get("secret")
  const userId = searchParams.get("userId")
  const isVerifying = userId && secret

  useEffect(() => {
    if (!userId || !secret) return

    const verifyEmail = async () => {
      try {
        await account.updateVerification(userId, secret)
        await updateMember({
          memberId: member.id,
          emailVerification: true,
          avatarUrl: member.avatarUrl,
          avatarId: member.avatarId,
          file: [],
        })
        setMember({
          ...member,
          emailVerification: true,
        })
        navigate("/")
      } catch (error) {
        toast.error(
          "Could not verify your email. Please contact Spark + Mint for assistance."
        )
        console.log(error)
      }
    }

    verifyEmail()
  }, [secret, userId])

  if (isVerifying) return null

  return (
    <div className="container h-full">
      <div className="flex flex-col gap-4 mt-24 text-center">
        <MailIcon
          strokeWidth={1.3}
          className="w-12 h-12 mx-auto text-primary"
        />
        <h4 className="h4">
          {isVerifying ? "Verifying your email..." : "Check your inbox!"}
        </h4>
        <p className="leading-6 text-muted-foreground">
          {isVerifying ? (
            "Hang tight."
          ) : (
            <div className="leading-7">
              We sent a verification email to {member.email}
              <br />
              If you didn't receive it, please{" "}
              <a className="text-primary" href="mailto:hello@sparkandmint.com">
                email us.
              </a>
            </div>
          )}
        </p>
      </div>
    </div>
  )
}

export default EmailVerification
