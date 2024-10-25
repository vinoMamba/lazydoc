import { getProjectInfoAction } from "@/action/get-project-info"
import { redirect } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CircleAlert } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const projectInfo = await getProjectInfoAction(params.projectId)
  if (!projectInfo) {
    redirect("/workbench")
  }
  if (projectInfo.isDeleted) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent className="top-1/4">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <CircleAlert />
              Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              The project
              <span className="font-bold">
                {`「${projectInfo.name}」`}
              </span>
              is deleted by the administrator.
              Click continue to go back to the workbench.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link href="/workbench">
              <AlertDialogAction>Continue</AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    )
  }
}
