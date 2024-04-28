import { Button } from "@/components/ui"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const AccountPage = () => {
  return (
    <div className="pb-12">
      <FadeIn className="space-y-6">
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Change password</h3>
          <p className="text-sm text-muted-foreground">
            Update your password associated with your account.
          </p>
        </div>

        <Button asChild>
          <Link to="/change-password">Click here to change your password</Link>
        </Button>
      </FadeIn>
    </div>
  )
}

export default AccountPage
