import { useEffect, useState } from "react"
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
  const [isVerifying, setIsVerifying] = useState(false)
  const secret = searchParams.get("secret")
  const userId = searchParams.get("userId")

  useEffect(() => {
    const verifyEmail = async () => {
      if (!userId || !secret) {
        return
      }

      try {
        setIsVerifying(true)
        await account.updateVerification(userId, secret)
        const updatedMember = await updateMember({
          memberId: member.id,
          profileId: member.profileId,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          avatarUrl: member.avatarUrl,
          avatarId: member.avatarId,
          profile: member.profile,
          file: [],
          emailVerification: true,
        })
        setMember({
          ...member,
          ...updatedMember,
        })
        navigate("/")
      } catch (error) {
        toast.error(
          "Could not verify your email. Please contact TeamSpark for assistance."
        )
        console.log(error)
      }
    }

    verifyEmail()
  }, [userId, secret])

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
        <div className="leading-6 text-muted-foreground">
          {isVerifying ? (
            "Hang tight."
          ) : (
            <div className="leading-7">
              We sent a verification email to{" "}
              <span className="text-gray-200">{member.email}</span>
              <br />
              If you didn't receive it, please{" "}
              <a className="text-primary" href="mailto:hello@sparkandmint.com">
                email us.
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
