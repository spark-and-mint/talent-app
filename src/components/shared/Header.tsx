import { useMemberContext } from "@/context/AuthContext"
import { Button } from "../ui/button"
import Section from "./Section"
import { Link } from "react-router-dom"
import { UserNav } from "./UserNav"

const Header = () => {
  const { isAuthenticated } = useMemberContext()

  return (
    <Section className="!px-0 !py-7">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <Link to="/">
          <img src="/assets/logo.svg" alt="logo" className="w-[4.5rem]" />
        </Link>

        {isAuthenticated ? (
          <UserNav />
        ) : (
          <Button variant="outline">Log in</Button>
        )}
      </div>
    </Section>
  )
}

export default Header
