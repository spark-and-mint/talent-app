import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useGetClientById, useGetProjectById } from "@/lib/react-query/queries"
import { Skeleton } from "../ui/skeleton"

const ProjectCard = ({
  projectId,
  clientId,
  role,
}: {
  projectId: string
  clientId: string
  role: string
}) => {
  const { data: project, isPending: isPendingProject } =
    useGetProjectById(projectId)
  const { data: client, isPending: isPendingClient } =
    useGetClientById(clientId)

  return (
    <>
      {isPendingProject || isPendingClient ? (
        <Card className="flex flex-col justify-between h-full p-2">
          <CardHeader>
            <CardTitle>
              <div>
                <div className="flex items-center justify-between">
                  <Skeleton className="mb-4 w-[20rem] h-10 rounded-md" />
                  <Skeleton className="w-20 h-20 rounded-full" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="mb-4 w-24 h-4 rounded-md" />
                  <Skeleton className="mb-4 w-64 h-4 rounded-md" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="mb-4 w-24 h-4 rounded-md" />
                  <Skeleton className="mb-4 w-64 h-4 rounded-md" />
                </div>
              </div>

              <div>
                <Skeleton className="w-32 h-12 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="flex flex-col justify-between h-full p-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col-reverse items-start justify-between sm:flex-row sm:items-center">
                <h4 className="h4 mt-4 sm:mt-0">{project?.title}</h4>
                {client?.logoUrl ? (
                  <img
                    src={client?.logoUrl.toString()}
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <Avatar>
                    <AvatarFallback>
                      <span className="text-sm uppercase">
                        {project?.title.substring(0, 2)}
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
                  <div className="text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                    Client
                  </div>
                  <p className="font-medium">{client?.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-primary tracking-[0.08em] uppercase text-xs font-semibold">
                    Your role
                  </div>
                  <p className="font-medium">{role}</p>
                </div>
              </div>

              <div>
                <Button asChild className="w-full">
                  <Link to={`/project/${project?.$id}`}>
                    Project details <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default ProjectCard
