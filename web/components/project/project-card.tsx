import { z } from "zod"
import { ProjectSchema } from "@/schemas/project"
import { Button } from "../ui/button"
import { TvMinimal } from "lucide-react"
import { EditProjectButton } from "./edit-project-button"
import { DelProjectButton } from "./del-project-button"

type Props = {
  project: z.infer<typeof ProjectSchema>
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <div key={project.id} className="dark:bg-[#2c2c2c] dark:hover:bg-[#303030] bg-[#fafafa] hover:bg-[#f2f2f2] p-4  rounded-xl bg-card text-card-foreground shadow h-[160px] relative group flex flex-col ease-in duration-100">
      <header>
        <h6 className="sm:text-xl md:text-2xl font-semibold text-card-foreground opacity-70 group-hover:opacity-100">{project.name}</h6>
        <span className=" text-muted-foreground text-sm">{project.createdAt}</span>
      </header>
      <p className=" text-muted-foreground text-sm italic line-clamp-3">{project.description}</p>
      <div className="group-hover:flex hidden absolute bottom-2 right-2  items-center gap-2 px-4 opacity-0 group-hover:opacity-50 bg-card rounded-md ease-in duration-300">
        <Button size="sm" variant="link" className="flex items-center gap-1 mx-0 px-0">
          <TvMinimal className=" w-[1rem] h-[1rem]" />
        </Button>
        <EditProjectButton project={project} />
        <DelProjectButton projectId={project.id} />
      </div>
    </div>
  )
}
