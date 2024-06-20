import { Loader } from "@/components/shared"
import ApplicationForm from "@/components/shared/ApplicationForm"
import { SidebarNav } from "@/components/shared/SidebarNav"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import ServerError from "@/components/shared/ServerError"
import acceptedMembers from "@/lib/constants/acceptedMembers"

const RootLayout = () => {
  const { member, setMember, serverError } = useMemberContext()
  const [loading, setLoading] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const { mutateAsync: updateMember } = useUpdateMember()
  const location = useLocation()
  const projectPage = location.pathname.includes("/project/")

  const checkMemberStatus = async () => {
    try {
      const isAccepted = acceptedMembers.includes(member.email)

      if (!isAccepted) {
        setShowApplicationForm(true)
      } else {
        setLoading(true)
        const updatedMember = await updateMember({
          memberId: member.id,
          profileId: member.profileId,
          email: member.email,
          firstName: member.firstName,
          lastName: member.lastName,
          avatarId: member.avatarId,
          file: [],
          profile: member.profile,
          status: "accepted",
        })

        setMember({
          ...member,
          ...updatedMember,
        })

        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (serverError) {
    return <ServerError />
  }

  if (!member.id) {
    return null
  }

  if (showApplicationForm) {
    return <ApplicationForm setShowApplicationForm={setShowApplicationForm} />
  }

  if (loading) {
    return <Loader />
  }

  if (member.status === null) {
    checkMemberStatus()
  }

  return (
    <div className="container h-full">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {!projectPage && (
          <aside className="lg:w-1/4">
            <SidebarNav />
          </aside>
        )}
        <div className={cn("flex-1", !projectPage && "lg:max-w-2xl")}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
