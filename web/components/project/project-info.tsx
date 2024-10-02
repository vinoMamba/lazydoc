import { getProjectInfoAction } from "@/action/get-project-info"
import { PenTool } from "lucide-react"

type Props = {
  projectId: string
}

export const ProjectInfo = async ({ projectId }: Props) => {
  const p = await getProjectInfoAction(projectId)
  return (
    <header className="mx-1  p-2 border-b">
      <h6 className="flex items-center gap-2 font-semibold opacity-80">
        <PenTool className="w-[1.2rem] h-[1.2rem]" />
        {p?.name}
      </h6>
    </header>
  )
}
