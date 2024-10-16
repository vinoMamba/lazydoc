export default function DocPage({ params }: { params: { docId: string } }) {
  return <div>{params.docId}</div>
}
