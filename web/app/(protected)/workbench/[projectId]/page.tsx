import { getProjectInfoAction } from "@/action/get-project-info"
import { redirect } from "next/navigation"

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const projectInfo = await getProjectInfoAction(params.projectId)
  if (!projectInfo) {
    redirect("/workbench")
  }
}
