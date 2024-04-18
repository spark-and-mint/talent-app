import { Button } from "@/components/ui"
import { Card } from "@/components/ui/card"
import { useMemberContext } from "@/context/AuthContext"
import { cn } from "@/lib/utils"
import { ArrowRight, ExternalLink, Heart, ScrollText, User } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"

const Home = () => {
  const { member } = useMemberContext()
  const accepted = member.status === "accepted"

  return (
    <FadeIn className="pb-16 space-y-4">
      <div className="relative flex justify-between items-center mb-8 -mt-2">
        <div>
          <h4 className="h4 mb-1">
            Hello, <span className="capitalize">{member.firstName}</span>!
          </h4>
          <p
            className={cn(
              "max-w-[34rem]",
              accepted ? "mt-1.5 text-lg" : "text-base"
            )}
          >
            {accepted
              ? "Welcome to the Spark + Mint talent network."
              : "Thank you for applying. Feel free to add any additional information to your profile – this will be really helpful when we review your application."}
          </p>
        </div>
        <img
          src="/assets/stars-multiple.svg"
          className="hidden sm:block w-14 h-14 mr-3"
        />
      </div>

      {accepted ? (
        <Link
          to="https://sparkmintfractional.slack.com/"
          target="_blank"
          className="block"
        >
          <Card className="flex items-center justify-between group hover:bg-slate-400/15 hover:border-cyan-400 transition-colors duration-100">
            <div className="flex items-center gap-6">
              <img src="/assets/slack.webp" className="w-10 h-10 ml-1.5" />
              <div className="flex-1">
                <h6 className="h6 text-lg mb-1 group-hover:text-white transition-colors duration-100">
                  Join our Slack!
                </h6>
                <p className="pr-2 sm:pr-0">
                  Connect with other members and mentors in our network.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-slate-600">
                <ArrowRight strokeWidth={1.3} className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        <Link to="/profile" className="block">
          <Card className="flex items-center justify-between group hover:bg-slate-400/15 hover:border-cyan-400 transition-colors duration-100">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full transition-colors duration-100">
                <User strokeWidth={2} className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h6 className="h6 text-lg mb-1 group-hover:text-white transition-colors duration-100">
                  Complete your Profile
                </h6>
                <p>Add more details to get started on your journey.</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-100 bg-transparent border border-primary text-primary group-hover:bg-primary group-hover:text-slate-600">
                <ArrowRight strokeWidth={1.3} className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2">
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full transition-colors duration-100">
            <ScrollText className="w-6 h-6" />
          </div>
          <div>
            <h6 className="h6 mb-2">Read our Manifesto</h6>
            <p>Understand our values and what keeps us exploring together.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link to="/community" className="flex items-center">
                Open manifesto <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="relative flex flex-col gap-5">
          <div className="flex items-center justify-center w-10 h-10 bg-primary text-slate-800 rounded-full transition-colors duration-100">
            <Heart strokeWidth={2} className="w-6 h-6" />
          </div>
          <div>
            <h6 className="h6 mb-2">Stay in the Loop</h6>
            <p>Connect with us on X for the latest updates and news.</p>
          </div>
          <div className="mt-2">
            <Button asChild variant="secondary">
              <Link to="https://x.com/sparkandmint" target="_blank">
                Connect with us <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </FadeIn>
  )
}

export default Home
