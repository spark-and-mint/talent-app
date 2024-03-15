import { Button } from "@/components/ui/button"
import { useMemberContext } from "@/context/AuthContext"
import { SquareUser } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Home = () => {
  const { member } = useMemberContext()
  const accepted = member.status === "accepted"

  console.log(member)

  return (
    <FadeIn>
      <div className="relative flex justify-between w-full p-8 border-2 border-border rounded-xl">
        <div>
          <img
            src="/assets/stars-multiple.svg"
            className="absolute w-15 h-15 top-8 right-8"
          />
          <h2 className="h2 mb-3">Hello, {member.firstName}!</h2>
          <p>
            {accepted
              ? "Welcome to the Spark + Mint talent network."
              : "Thank you for filling out our application form."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div className="relative flex flex-col gap-5 p-8 rounded-xl border-2 border-border">
          <img src="/assets/slack.webp" alt="" className="w-9 h-9" />
          <div>
            <h6 className="h6 mb-2">Explore the community</h6>
            <p>Connect with other members and mentors in our network.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link to="/community">Join our Slack!</Link>
            </Button>
          </div>
        </div>
        <div className="relative flex flex-col gap-5 p-8 rounded-xl border-2 border-border">
          <SquareUser
            strokeWidth={1.25}
            className="w-9 h-9 scale-125 text-primary"
          />
          <div>
            <h6 className="h6 mb-2">Complete your profile</h6>
            <p>Add more details to get started with your journey.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link to="/community">Update profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default Home
