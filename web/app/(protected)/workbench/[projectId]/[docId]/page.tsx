import { getDocInfo } from "@/action/get-doc"
import { GoBack } from "@/components/go-back-button"

export default async function DocPage({ params }: { params: { docId: string } }) {
  const docInfo = await getDocInfo({ docId: params.docId })
  if (docInfo) {
    return <div>{JSON.stringify(docInfo)}</div>
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        Current doc is not exist
        <GoBack />
      </div>
    )
  }
}
