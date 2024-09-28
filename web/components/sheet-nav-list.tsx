"use client"

import { Home, LineChart, PanelLeftClose, Settings, Users2 } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import { Button } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogoutButton } from "./logout-button"
import { Separator } from "./ui/separator"

const navList = [
  { link: '/workbench', title: 'Workbench', icon: <Home className="h-5 w-5 transition-all group-hover:scale-110" /> },
  { link: '/management', title: 'Management', icon: <Users2 className="h-5 w-5 transition-all group-hover:scale-110" /> },
  { link: '#', title: 'Analysis', icon: <LineChart className="h-4 w-4 transition-all group-hover:scale-110" /> },
]


export const SheetNavList = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <>
      <Button size="icon" variant="outline" className="sm:hidden" onClick={() => setOpen(true)}>
        <PanelLeftClose className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="sm:max-w-xs h-full flex flex-col">
          <SheetHeader className="text-left pl-4">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <nav className="grid gap-6 text-lg font-medium ">
            {
              navList.map(item => (
                <Link
                  onClick={() => setOpen(false)}
                  key={item.link}
                  href={item.link}
                  className={cn(
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground",
                    pathname === item.link && "text-foreground"
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))
            }
          </nav>
          <Separator />
          <nav className="text-lg mt-auto font-medium mb-4 flex items-center justify-between">
            <Link
              onClick={() => setOpen(false)}
              href="/settings"
            >
              <Button variant="link" className={cn("inline-flex gap-1 items-center text-foreground", pathname === "/settings" && "text-foreground")}>
                <Settings className=" w-[1rem] h-[1rem]" />
                Settings
              </Button>
            </Link>
            <LogoutButton />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
