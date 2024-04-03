import { Button } from "@/components/ui/button"
import { CircleAlert, LinkIcon, Sprout } from "lucide-react"
import FadeIn from "react-fade-in"
import XLogo from "@/svg/XLogo"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LinkedInLogo from "@/svg/LinkedInLogo"
import { Card } from "@/components/ui/card"

const Opportunities = () => {
  const opportunity = {
    client: "Global Unity",
    role: "Product Designer",
    description:
      "Global Unity needs a new website redesign and you are the proposed lead designer for the project.",
    projectDuration: "3 Months",
    projectType: "Hourly | Part-time | Full-time",
    estimatedEarnings: "$7,500 – $9,000 USD",
    clientBackground:
      "Global Unity is an innovative educational platform designed to create open-source learning opportunities. They want to redesign their website to enhance the learning experience.",
    responsibilities:
      "Lead the website redesign, collaborate with the development team, ensure UX/UI best practices are followed.",
  }

  return (
    <div className="pb-16">
      {opportunity ? (
        <>
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start justify-between">
              <div>
                <div className="mb-4 text-primary tracking-[0.08em] uppercase text-sm font-semibold">
                  You have a new opportunity with
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/global-unity-logo.png"
                    alt="logo"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                  />
                  <h3 className="h3">{opportunity.client}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-6 sm:mt-0">
                <Button variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <XLogo className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <LinkedInLogo className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="mt-8 py-2">
              <dl className="divide-y divide-stroke-1">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Your role
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {opportunity.role}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Project duration
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {opportunity.projectDuration}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Project type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {opportunity.projectType}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Estimated earnings
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      {opportunity.estimatedEarnings}
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger>
                          <CircleAlert className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs p-2 leading-5">
                            This estimation is based solely on your hourly rate
                            and our initial project scope. It might change due
                            to project variations or unforeseen circumstances.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Background
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {opportunity.clientBackground}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-primary">
                    Your responsibilities
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {opportunity.responsibilities}
                  </dd>
                </div>
              </dl>
            </Card>
          </FadeIn>

          <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-between mt-10">
            <p className="text-sm mt-4 sm:mt-0">
              Questions? Contact us{" "}
              <a href="mailto:hello@sparkandmint.com" className="underline">
                here
              </a>{" "}
              or on Slack.
            </p>
            <div className="flex gap-4">
              <Button variant="secondary">Decline</Button>
              <Button>Accept opportunity</Button>
            </div>
          </div>
        </>
      ) : (
        <FadeIn>
          <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
            <Sprout strokeWidth={1} className="h-16 w-16 text-primary" />
            <h6 className="h6 text-[1.325rem] mt-3 text-center">
              We're busy planting the seeds for new opportunities
            </h6>
            <p className="mt-2 text-muted-foreground text-center ">
              If anything pops up for you, it will be shown here.
            </p>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

export default Opportunities
