import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "react-router-dom"
import Panel from "./Panel"
import { ArrowRight } from "lucide-react"
import { Models } from "appwrite"

const ProjectCard = ({ project }: { project: Models.Document }) => {
  return (
    <Panel className="flex flex-col justify-between h-full p-2">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h4 className="h4">{project.name}</h4>
            {project.client?.logoUrl ? (
              <img
                src={project.client?.logoUrl.toString()}
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <Avatar>
                <AvatarFallback>
                  <span className="text-sm uppercase">
                    {project.name.substring(0, 2)}
                  </span>
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Your role</h4>
              <p className="font-medium">Product Designer</p>
            </div>
            <div className="flex flex-col gap-2">
              {project.members && project.members.length > 0 ? (
                <>
                  <h4 className="text-sm font-medium">Team members</h4>
                  <div className="flex items-center space-x-4">
                    {project.members.map((member: Models.Document) => (
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
                </>
              ) : (
                <p className="text-center py-8">No members assigned</p>
              )}
            </div>
          </div>

          <div>
            <Button asChild className="w-full">
              <Link to={`/project/${project.projectId}`}>
                Project details <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Panel>
  )
}

export default ProjectCard
