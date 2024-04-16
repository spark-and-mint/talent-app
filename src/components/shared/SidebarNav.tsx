import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import {
  HomeIcon,
  UserIcon,
  BriefcaseBusinessIcon,
  Rocket,
  Gift,
} from "lucide-react"
import FadeIn from "react-fade-in"
import { useGetMemberOpportunities } from "@/lib/react-query/queries"
import { useMemberContext } from "@/context/AuthContext"

export function SidebarNav() {
  const { member } = useMemberContext()
  const { data: opportunityData } = useGetMemberOpportunities(member.id)

  const opportunity = opportunityData?.documents.find(
    (document) => document.status === "awaiting response"
  )

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
      badge: opportunity ? "1" : false,
    },
    {
      title: "My Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
    },
    {
      title: "Refer and Earn",
      icon: Gift,
      to: "/referral",
    },
  ]

  return (
    <FadeIn className="hidden sm:flex space-x-2 w-full lg:flex-col lg:space-x-0 lg:space-y-2">
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
          {link.badge && (
            <span className="ml-3 px-2 py-0.5 text-xs font-semibold text-black bg-primary rounded-full">
              {link.badge}
            </span>
          )}
        </NavLink>
      ))}
    </FadeIn>
  )
}
