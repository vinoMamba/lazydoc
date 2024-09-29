import { getUserListAction, SearchParams } from "@/action/get-user-list"
import { columns } from "./columns"
import { DataTable } from "./data-table"


export const UserTable = async ({ searchParams }: { searchParams: SearchParams }) => {
  const result = await getUserListAction(searchParams)

  if (!result) {
    return <DataTable columns={columns} data={[]} pagination={{ pageIndex: 0, pageSize: 0 }} />
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={result!.items || []}
        total={result!.total}
        pagination={{ pageSize: result!.pageSize, pageIndex: result!.pageNum - 1 }}
      />
    </>
  )
}
