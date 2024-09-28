import { getUserInfoAction } from "@/action/get-user-info"
import { Security } from "@/components/security"
import { ThemeSelect } from "@/components/theme-select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TriangleAlert } from "lucide-react"

export default async function SettingsPage() {
  const userInfo = await getUserInfoAction()

  if (!userInfo?.isSuper) {
    return (
      <Card className="m-4 md:m-14 border-none shadow-none space-y-4">
        <CardHeader>
          <CardTitle className=" text-3xl">Settings</CardTitle>
          <CardDescription> Manage your account settings and set theme preferences.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-screen-md space-y-4">
          <Security />
          <ThemeSelect />
        </CardContent>
      </Card>
    )
  } else {
    return (
      <div className="flex items-center gap-2 justify-center h-screen text-muted-foreground text-lg">
        <TriangleAlert />
        your are not administrator
      </div>
    )
  }
}
