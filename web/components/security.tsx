import { Input } from "@/components/ui/input"
import { EmailDialog } from "./email-dialog"
import { PasswordDialog } from "./password-dialog"
import { getUserInfoAction } from "@/action/get-user-info"

export const Security = async () => {
  const userInfo = await getUserInfoAction()
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 text-sm">
        <span className="text-muted-foreground text-lg font-semibold">Email</span>
        <div className=" flex items-center gap-4">
          <Input value={userInfo?.email} disabled />
          <EmailDialog email={userInfo?.email} />
        </div>
      </div>
      <div className="flex flex-col gap-4 text-sm">
        <span className="text-muted-foreground text-lg font-semibold">Password</span>
        <div className=" flex items-center gap-4">
          <Input value="******" type="password" disabled />
          <PasswordDialog />
        </div>
      </div>
    </div>
  )
}
