"use client"

import { usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Home, LineChart, Users2 } from "lucide-react";
import Link from "next/link";


const navList = [
  { link: '/workbench', title: 'Workbench', icon: <Home className="h-5 w-5 transition-all group-hover:scale-110" /> },
  { link: '/management', title: 'Management', icon: <Users2 className="h-5 w-5 transition-all group-hover:scale-110" /> },
  { link: '#', title: 'Analysis', icon: <LineChart className="h-4 w-4 transition-all group-hover:scale-110" /> },
]

export const NavList = () => {
  const pathname = usePathname()
  return (
    <>
      {
        navList.map(item => (
          <Tooltip key={item.link}>
            <TooltipTrigger asChild>
              <Link
                href={item.link}
                className={
                  cn(
                    "group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname.includes(item.link)  && "text-foreground"
                  )
                }
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
