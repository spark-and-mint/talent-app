import ProjectCard from "@/components/shared/ProjectCard"
import { Card } from "@/components/ui/card"
import { TreePalm } from "lucide-react"
import FadeIn from "react-fade-in"

const Projects = () => {
  const projects = [
    {
      $id: "1",
      name: "Marketing Website Redesign",
      logoUrl: "/assets/global-unity-logo.png",
      client: {
        name: "Global Unity",
        logoUrl: "/assets/global-unity-logo.png",
      },
      team: [
        {
          $id: "1",
          avatarUrl: "/assets/avatars/01.png",
          firstName: "John",
          lastName: "Doe",
        },
        {
          $id: "2",
          avatarUrl: "/assets/avatars/02.png",
          firstName: "Jane",
          lastName: "Doe",
        },
      ],
    },
  ]

  return (
    <div className="pb-16">
      {projects.length > 0 ? (
        <FadeIn className="flex flex-col gap-8">
          {projects?.map((project: any) => (
            <div key={project.$id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </FadeIn>
      ) : (
        <FadeIn>
          <Card className="flex flex-col items-center justify-center h-full py-16">
            <TreePalm strokeWidth={1} className="h-14 w-14 text-primary" />
            <h6 className="h6 text-[1.325rem] mt-3 text-center">
              No projects yet
            </h6>
            <p className="mt-2 text-muted-foreground text-center ">
              All your accepted opportunities will be listed here.
            </p>
          </Card>
        </FadeIn>
      )}
    </div>
  )
}

export default Projects
