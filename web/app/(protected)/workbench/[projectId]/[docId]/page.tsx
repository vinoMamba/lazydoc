import { getDocInfo } from "@/action/get-doc"
import { redirect } from "next/navigation"

export default async function DocPage({ params }: { params: { docId: string, projectId: string } }) {
  const docInfo = await getDocInfo({ docId: params.docId, projectId: params.projectId })
  if (docInfo) {
    return <div>{JSON.stringify(docInfo)}</div>
  } else {
    redirect(`/workbench/${params.projectId}`)
  }
}
