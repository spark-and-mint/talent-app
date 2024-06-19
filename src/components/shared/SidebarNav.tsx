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

  const newOpportunity = opportunityData?.documents.find(
    (document) => document.status === "awaiting response"
  )

  const acceptedOpportunities = opportunityData?.documents.filter(
    (document) => document.status === "accepted"
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
      badge: newOpportunity ? "New" : false,
    },
    {
      title: "My Projects",
      icon: BriefcaseBusinessIcon,
      to: "/projects",
      badge:
        acceptedOpportunities && acceptedOpportunities.length > 0
          ? `${acceptedOpportunities.length}`
          : false,
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
            <span
              className={cn(
                "ml-3 px-2.5 pt-0.25 pb-0.5 text-xs font-semibold rounded-full",
                link.title === "My Projects"
                  ? "text-white bg-secondary"
                  : "text-black bg-primary"
              )}
            >
              {link.badge}
            </span>
          )}
        </NavLink>
      ))}
    </FadeIn>
  )
}
