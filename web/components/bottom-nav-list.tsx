"use client"

import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Settings } from "lucide-react";


const bottomNavList = [
  { link: '/settings', title: 'Settings', icon: <Settings className="h-5 w-5 transition-all group-hover:scale-110" /> },
]


export const BottomNavList = () => {
  const pathname = usePathname()
  return (
    <>
      {
        bottomNavList.map(item => (
          <Tooltip key={item.link}>
            <TooltipTrigger asChild>
              <Link
                href={item.link}
                className={cn(
                  "group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                  pathname === item.link && "text-foreground"
                )}
              >
                {item.icon}
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))
      }
    </>
  )
}
