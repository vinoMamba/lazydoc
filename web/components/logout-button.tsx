"use client"

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { logoutAction } from "@/action/logout"

export const LogoutButton = () => {
  return (
    <Button variant="link" className="inline-flex gap-1 items-center text-foreground" onClick={() => logoutAction()}>
      <LogOut className=" w-[1rem] h-[1rem]" />
      Logout
    </Button>
  )
}
