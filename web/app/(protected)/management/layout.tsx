import { getUserInfoAction } from "@/action/get-user-info"
import { TriangleAlert } from "lucide-react"


export default async function ManagementLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await getUserInfoAction()
  if (userInfo?.isSuper) {
    return (
      <div>{children}</div>
    )
  } else {
    return (
      <div className="flex items-center gap-2 justify-center h-screen text-muted-foreground text-lg">
        <TriangleAlert />
        Your are not administrator
      </div>
    )
  }
}
