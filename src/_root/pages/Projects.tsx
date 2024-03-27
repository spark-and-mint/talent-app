import ProjectCard from "@/components/shared/ProjectCard"
import FadeIn from "react-fade-in"

const Projects = () => {
  const projects = [
    {
      $id: "1",
      name: "Global Unity Website Redesign",
      logoUrl: "/assets/global-unity-logo.png",
      client: {
        logoUrl: "/assets/global-unity-logo.png",
      },
      members: [
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
      <FadeIn className="flex flex-col gap-8">
        {projects?.map((project: any) => (
          <div key={project.$id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </FadeIn>
    </div>
  )
}

export default Projects
