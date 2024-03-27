import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, SquareArrowOutUpRight } from "lucide-react"
import FadeIn from "react-fade-in"
import { Link } from "react-router-dom"
import Milestone from "@/components/shared/Milestone"
import { NotionLogoIcon } from "@radix-ui/react-icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Project = () => {
  const project = {
    title: "Global Unity Website Redesign",
    description:
      "Redesign the Global Unity website to make it more modern and user-friendly.",
    status: "In progress",
    client: {
      name: "Global Unity",
      logoUrl: "/assets/logos/global-unity.png",
    },
    team: [
      {
        $id: "1",
        firstName: "Alice",
        lastName: "Doe",
        role: "Project Manager",
        avatarUrl: "/assets/avatars/01.png",
      },
      {
        $id: "2",
        firstName: "Bob",
        lastName: "Doe",
        role: "Designer",
        avatarUrl: "/assets/avatars/02.png",
      },
    ],
    milestones: [
      {
        milestoneId: "1",
        title: "Research & Discovery",
        description: "Research and discovery phase for the new website design.",
        status: "approved",
        updates: [
          {
            updateId: "1",
            title: "User Research Report",
            type: "Document",
            link: "#",
            description:
              "The user research report for the new website design. It includes user personas, user journey maps, and user stories.",
          },
          {
            updateId: "2",
            title: "Competitor Analysis",
            type: "Document",
            link: "#",
            description:
              "The competitor analysis for the new website design. It includes a list of competitors, their strengths, and weaknesses.",
          },
        ],
      },
      {
        milestoneId: "2",
        title: "Wireframes & Mockups",
        description: "Wireframes and mockups for the new website design.",
        status: "in-progress",
        updates: [
          {
            updateId: "3",
            title: "Lo-Fi Wireframes",
            link: "#",
            type: "Design asset",
            description: "Wireframes for the new website design.",
          },
        ],
      },
      {
        milestoneId: "3",
        title: "Prototype Development",
        description: "Development phase for the new website design.",
        status: "not-started",
        updates: [],
      },
    ],
  }

  return (
    <FadeIn className="pb-24">
      <div>
        <Button asChild variant="link" className="mb-4 -ml-4">
          <Link to="/projects">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </Button>

        <h3 className="h3 mb-2">{project.title}</h3>

        <div className="flex justify-between">
          <div className="flex items-center gap-4 mt-6">
            <Button variant="outline" size="sm">
              <NotionLogoIcon className="h-4 w-4 mr-2 pb-0.25" />
              Notion page
            </Button>
            <Button variant="outline" size="sm">
              <SquareArrowOutUpRight className="h-4 w-4 mr-2 pb-0.25" />
              Client website
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {project.team.map((member: any) => (
              <TooltipProvider delayDuration={100} key={member.$id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarImage src={member.avatarUrl} />
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {member.firstName} {member.lastName}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div>
        <div>
          <h4 className="h4">Milestones & Updates</h4>
          <p className="text-sm text-muted-foreground">
            Add documents, design assets, reports, and other updates you have
            for the client under each milestones.
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {project.milestones.length === 0 ? (
            <p className="pt-5 pb-6 text-sm">No milestones added yet.</p>
          ) : (
            <>
              {project.milestones.map((milestone) => (
                <Milestone key={milestone.milestoneId} {...milestone} />
              ))}
            </>
          )}
        </div>
      </div>
    </FadeIn>
  )
}

export default Project
