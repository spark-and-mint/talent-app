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
import { useMemberContext } from "@/context/AuthContext"
import { useGetMemberOpportunity } from "@/lib/react-query/queries"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

const Opportunities = () => {
  const { member } = useMemberContext()
  const { data: opportunityData, isPending } = useGetMemberOpportunity(
    member.id
  )
  const opportunity = opportunityData?.documents[0]

  return (
    <div className="pb-16">
      {isPending ? (
        <div>
          <div className="flex justify-between">
            <Skeleton className="mb-4 w-[18rem] h-7 rounded-md" />
            <div className="flex justify-end gap-2">
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-[3.75rem] h-[3.75rem] rounded-full" />
            <Skeleton className="w-[21rem] h-12 rounded-md" />
          </div>
          <div className="mt-8 space-y-10">
            <Skeleton className="w-full h-14 rounded-md" />
            <Skeleton className="w-full h-14 rounded-md" />
            <Skeleton className="w-full h-14 rounded-md" />
          </div>
        </div>
      ) : (
        <>
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
                        src={opportunity.client.logoUrl}
                        alt="logo"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                      />
                      <h3 className="h3">{opportunity.client.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-6 sm:mt-0">
                    <Button asChild variant="outline" size="sm">
                      <Link to={opportunity.client.website}>
                        <LinkIcon className="h-4 w-4" />
                      </Link>
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
                        {opportunity.duration}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Project type
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.type}
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
                                This estimation is based solely on your hourly
                                rate and our initial project scope. It might
                                change due to project variations or unforeseen
                                circumstances.
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
                        {opportunity.background}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-primary">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                        {opportunity.description}
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
        </>
      )}
    </div>
  )
}

export default Opportunities
