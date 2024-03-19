import { Loader } from "@/components/shared"
import ApplicationForm from "@/components/shared/ApplicationForm"
import { SidebarNav } from "@/components/shared/SidebarNav"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import { EmailVerification } from "./pages"
import { AnnoyedIcon, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui"

const acceptedMembers = ["kevin@sparkandmint.com"]

const RootLayout = () => {
  const { member, setMember } = useMemberContext()
  const [loading, setLoading] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const { mutateAsync: updateMember } = useUpdateMember()
  const goToDashboard =
    member.status === "form completed" || member.status === "accepted"

  const checkMemberStatus = async () => {
    try {
      const isAccepted = acceptedMembers.includes(member.email)

      if (!isAccepted) {
        setShowApplicationForm(true)
      } else {
        setLoading(true)
        const updatedMember = await updateMember({
          memberId: member.id,
          status: "accepted",
          avatarId: member.avatarId,
          file: [],
        })

        setMember({
          ...member,
          status: updatedMember?.status,
        })

        setTimeout(() => {
          setLoading(false)
        }, 3500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!member.id) {
    return null
  }

  if (!member.emailVerification) {
    return <EmailVerification />
  }

  if (showApplicationForm) {
    return <ApplicationForm setShowApplicationForm={setShowApplicationForm} />
  }

  if (loading) {
    return <Loader text="Cosmic calibration underway..." />
  }

  if (member.status === null) {
    checkMemberStatus()
  }

  if (goToDashboard) {
    return (
      <div className="container h-full">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/4">
            <SidebarNav />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container h-full">
      <div className="flex flex-col gap-4 mt-24 text-center">
        <AnnoyedIcon
          strokeWidth={1.5}
          className="w-12 h-12 mx-auto text-primary"
        />
        <h4 className="h4">Hmm, something went wrong.</h4>
        <p className="leading-6 text-muted-foreground">
          If this issue persists, please contact us on Slack or at{" "}
          <a className="text-primary" href="mailto:hello@sparkandmint.com">
            hello@sparkandmint.com
          </a>
        </p>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reload page
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RootLayout
