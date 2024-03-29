import Panel from "@/components/shared/Panel"
import { Button } from "@/components/ui/button"
import { CircleAlert, LinkIcon } from "lucide-react"
import FadeIn from "react-fade-in"
import XLogo from "@/svg/XLogo"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import LinkedInLogo from "@/svg/LinkedInLogo"

const Opportunities = () => {
  const opportunity = {
    client: "Global Unity",
    role: "Product Designer",
    description:
      "Global Unity needs a new website redesign and you are the proposed lead designer for the project.",
    projectDuration: "3 Months",
    projectType: "Hourly | Part-time | Full-time",
    estimatedEarnings: "$7,500 – $9,000 USD ",
    clientBackground:
      "Global Unity is an innovative educational platform designed to create open-source learning opportunities. They want to redesign their website to enhance the learning experience.",
    responsibilities:
      "Lead the website redesign, collaborate with the development team, ensure UX/UI best practices are followed.",
  }

  return (
    <div className="pb-16">
      <FadeIn>
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-4 text-primary tracking-[0.08em] uppercase text-sm font-semibold">
              You have a new opportunity with
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/assets/global-unity-logo.png"
                alt="logo"
                className="w-14 h-14 rounded-full"
              />
              <h3 className="h3">{opportunity.client}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
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

        <Panel className="mt-8 py-2">
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
                        This estimation is based solely on your hourly rate and
                        our initial project scope. It might change due to
                        project variations or unforeseen circumstances.
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
        </Panel>
      </FadeIn>

      <div className="flex gap-4 items-center justify-between mt-10">
        <p className="text-sm">
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
    </div>
  )
}

export default Opportunities
