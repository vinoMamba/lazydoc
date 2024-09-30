import { getUserInfoAction } from "@/action/get-user-info"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { LogoutButton } from "./logout-button"
import { getFirstStr } from "@/lib/string"
import { cn } from "@/lib/utils"

type Props = {
  showPopover?: boolean,
  className?: string
}

export const UserAvatar = async ({ showPopover = true, className }: Props) => {
  const userInfo = await getUserInfoAction()
  const fallbackStr = getFirstStr(userInfo?.username || "CN")
  const url = `${process.env.NEXT_API_URL}/upload/icon/${userInfo?.avatar}`
  return (
    <>
      {
        showPopover
          ? (
            <div>
              <Popover>
                <PopoverTrigger>
                  <Avatar className={cn(className)}>
                    <AvatarImage src={url} alt={userInfo?.username} />
                    <AvatarFallback className="text-muted-foreground">{fallbackStr}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className=" space-y-4 ml-1">
                  <div className="flex gap-2">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
                      <AvatarFallback className="text-muted-foreground">{fallbackStr}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className=" text-lg font-semibold">{userInfo?.username}</span>
                      <span className=" text-muted-foreground italic">{userInfo?.email}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className=" text-right">
                    <LogoutButton />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )
          : (
            <Avatar className={cn(className)}>
              <AvatarImage src={url} alt={userInfo?.username} />
              <AvatarFallback className="text-muted-foreground">{fallbackStr}</AvatarFallback>
            </Avatar>
          )
      }
    </>
  )
}
