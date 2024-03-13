import { SidebarNav } from "@/components/shared/SidebarNav"
import {
  HomeIcon,
  UserIcon,
  BriefcaseBusinessIcon,
  FileTextIcon,
  SettingsIcon,
} from "lucide-react"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  const sidebarNavLinks = [
    {
      title: "Home",
      icon: HomeIcon,
      to: "/",
    },
    {
      title: "Profile",
      icon: UserIcon,
      to: "/profile",
    },
    {
      title: "Work",
      icon: BriefcaseBusinessIcon,
      to: "/work",
      badge: 1,
    },
    {
      title: "Contract",
      icon: FileTextIcon,
      to: "/contract",
    },
    {
      title: "Account",
      icon: SettingsIcon,
      to: "/account",
    },
  ]

  return (
    <div className="container h-full">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <SidebarNav links={sidebarNavLinks} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
