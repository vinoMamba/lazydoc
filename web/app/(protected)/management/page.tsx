import { SearchParams } from "@/action/get-user-list"
import { AddUserButton } from "@/components/add-user-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserTable } from "@/components/user-table"
import { SearchInput } from "@/components/user-table/search-input"
import { redirect } from "next/navigation"

export default function ManagementPage({ searchParams }: { searchParams: SearchParams }) {

  if (!searchParams.pageNum) {
    redirect("/management?pageNum=1")
  }

  return (
    <Card className="m-4 md:m-14 border-none shadow-none space-y-4">
      <CardHeader>
        <CardTitle className=" text-3xl">Management</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="max-w-screen-md space-y-4">
        <div className="flex items-center gap-4">
          <SearchInput />
          <AddUserButton />
        </div>
        <UserTable searchParams={searchParams} />
      </CardContent>
    </Card>
  )
}
