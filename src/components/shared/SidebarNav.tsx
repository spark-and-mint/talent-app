import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  UserIcon,
  BriefcaseBusinessIcon,
  SettingsIcon,
  Rocket,
  // FileTextIcon,
} from "lucide-react"
import FadeIn from "react-fade-in"

export function SidebarNav() {
  const navLinks = [
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
      title: "Opportunities",
      icon: Rocket,
      to: "/opportunities",
      // badge: 1,
    },
    {
      title: "My Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
    },
    // {
    //   title: "Contracts",
    //   icon: FileTextIcon,
    //   to: "/contract",
    // },
    {
      title: "Account",
      icon: SettingsIcon,
      to: "/account",
    },
  ]

  return (
    <FadeIn className="flex space-x-2 w-full lg:flex-col lg:space-x-0 lg:space-y-2">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              `w-full justify-start rounded-md font-medium ${
                isActive && "bg-muted hover:bg-muted"
              }`
            )
          }
          end
        >
          <link.icon className="w-4 h-4 mr-2" />
          {link.title}
          {/* {link.badge && (
            <span className="ml-3 px-2 py-0.5 text-xs font-semibold text-black bg-primary rounded-full">
              {link.badge}
            </span>
          )} */}
        </NavLink>
      ))}
    </FadeIn>
  )
}
