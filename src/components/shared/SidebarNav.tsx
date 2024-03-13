import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { LucideIcon } from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    to: string
    icon: LucideIcon
    title: string
    badge?: number
  }[]
}

export function SidebarNav({ className, links, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2",
        className
      )}
      {...props}
    >
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              `justify-start rounded-md font-medium ${
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
    </nav>
  )
}
