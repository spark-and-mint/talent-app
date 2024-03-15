import { Loader } from "@/components/shared"
import ApplicationForm from "@/components/shared/ApplicationForm"
import { SidebarNav } from "@/components/shared/SidebarNav"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

const acceptedMembers = ["accepted2@sparkandmint.com"]

const RootLayout = () => {
  const { member, setMember } = useMemberContext()
  const [loading, setLoading] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const { mutateAsync: updateMember } = useUpdateMember()
  const skipForm =
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

        setTimeout(() => {
          setMember({
            ...member,
            status: updatedMember?.status,
          })
          setLoading(false)
        }, 3500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (member.id && !member.status) {
      checkMemberStatus()
    }
  }, [member.status])

  if (skipForm) {
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
  } else if (loading) {
    return <Loader />
  } else if (showApplicationForm) {
    return <ApplicationForm />
  } else {
    return null
  }
}

export default RootLayout
