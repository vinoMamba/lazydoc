import { Security } from "@/components/security"
import { ThemeSelect } from "@/components/theme-select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SettingsPage() {
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
}
