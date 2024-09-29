import { getUserListAction } from "@/action/get-user-list"
import { AddUserButton } from "@/components/add-user-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ManagementPage() {
  const list = await getUserListAction()
  return (
    <Card className="m-4 md:m-14 border-none shadow-none space-y-4">
      <CardHeader>
        <CardTitle className=" text-3xl">Management</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="max-w-screen-md space-y-4">
        <AddUserButton />
        <div>{JSON.stringify(list)}</div>
      </CardContent>
    </Card>
  )
}
