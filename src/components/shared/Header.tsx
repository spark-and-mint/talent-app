import { useMemberContext } from "@/context/AuthContext"
import { Button } from "../ui/button"
import Section from "./Section"
import { Link, useLocation } from "react-router-dom"
import { UserNav } from "./UserNav"
import {
  BriefcaseBusiness,
  Gift,
  Home,
  PanelLeft,
  Rocket,
  UserIcon,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import StarSvg from "@/svg/StarSvg"
import { cn } from "@/lib/utils"

const Header = () => {
  const { member, isAuthenticated, isLoading } = useMemberContext()
  const location = useLocation()

  return (
    <Section className="!px-0 !py-0 flex items-center min-h-24">
      <div className="relative container flex justify-between items-center gap-10">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className={cn("sm:hidden", !member.emailVerification && "hidden")}
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <StarSvg className="w-8 h-8 mb-8 pl-2" />
              <Link
                to="/"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Home
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-4 px-2.5 text-foreground"
              >
                <UserIcon className="h-5 w-5" />
                Profile
              </Link>
              <Link
                to="/opportunities"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Rocket className="h-5 w-5" />
                Opportunities
              </Link>
              <Link
                to="/projects"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <BriefcaseBusiness className="h-5 w-5" />
                My Projects
              </Link>
              <Link
                to="/referral"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Gift className="h-5 w-5" />
                Refer and Earn
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/">
          <img src="/assets/logo.svg" alt="logo" className="w-[4.5rem]" />
        </Link>

        {import.meta.env.DEV && (
          <div className="fixed left-8 bottom-4 font-medium tracking-wide">
            TALENT APP
          </div>
        )}

        {isAuthenticated ? (
          <UserNav />
        ) : (
          <>
            {isLoading ? (
              <div className="animate-ping">
                <StarSvg className="w-5 h-5" />
              </div>
            ) : (
              <>
                {location.pathname === "/sign-up" ? (
                  <Button asChild variant="outline">
                    <Link to="/sign-in">Log in</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link to="/sign-up">Sign up</Link>
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Section>
  )
}

export default Header
