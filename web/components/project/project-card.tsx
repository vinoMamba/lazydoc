import { Edit, TvMinimal } from "lucide-react"
import { Button } from "../ui/button"
import { z } from "zod"
import { ProjectSchema } from "@/schemas/project"

type Props = {
  project: z.infer<typeof ProjectSchema>
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <div key={project.id} className="dark:bg-[#2c2c2c] dark:hover:bg-[#303030] bg-[#fafafa] hover:bg-[#f2f2f2] p-4  rounded-xl bg-card text-card-foreground shadow h-[180px] relative group flex flex-col">
      <header>
        <h6 className="sm:text-xl md:text-2xl font-semibold text-card-foreground opacity-70 group-hover:opacity-100">{project.name}</h6>
        <span className=" text-muted-foreground text-sm">{project.createdAt}</span>
      </header>
      <section>
        <p className=" text-muted-foreground text-sm italic line-clamp-3">{project.description}</p>
      </section>
      <div className="flex items-center justify-end gap-2 mt-auto">
        <Button size="sm" variant="link" className="flex items-center gap-1">
          <TvMinimal className="w-[0.8rem] h-[0.8rem] text-muted-foreground" />
          View
        </Button>
        <Button size="sm" variant="link" className="flex items-center gap-1">
          <Edit className=" w-[0.8rem] h-[0.8rem] text-muted-foreground" />
          Edit
        </Button>
      </div>
    </div>
  )
}
