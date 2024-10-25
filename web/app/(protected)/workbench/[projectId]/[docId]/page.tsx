import { getDocInfo } from "@/action/get-doc"
import { redirect } from "next/navigation"

export default async function DocPage(props: { params: Promise<{ docId: string, projectId: string }> }) {
  const params = await props.params;
  const docInfo = await getDocInfo({ docId: params.docId, projectId: params.projectId })
  if (docInfo) {
    return <div>{JSON.stringify(docInfo)}</div>
  } else {
    redirect(`/workbench/${params.projectId}`)
  }
}
