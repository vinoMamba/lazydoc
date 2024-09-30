import { Inputer } from "./inputer"
import { IconUpload } from "./icon-upload"
import { getUserInfoAction } from "@/action/get-user-info"
import { UserAvatar } from "./user-avatar"

export const Profile = async () => {
  const userInfo = await getUserInfoAction()
  return (
    <div className=" space-y-10">
      <div className="flex items-end gap-8">
        <UserAvatar showPopover={false} className="w-16 h-16" />
        <IconUpload />
      </div>
      <div className="flex flex-col gap-4 text-sm">
        <span className="text-muted-foreground text-lg font-semibold">Username</span>
        <Inputer value={userInfo?.username} />
      </div>
    </div>
  )
}
