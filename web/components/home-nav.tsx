import { cn } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { sitConfig } from "@/config/site"
import { ModeToggle } from "./theme-toggle"

export const HomeNav = () => {
  return (
    <nav className="flex items-center px-4 py-2">
      <Link target="_blank" href={sitConfig.blogUrl} className={cn(buttonVariants({ variant: 'link' }))}>Blog</Link>
      <Link target="_blank" href={sitConfig.aboutUrl} className={cn(buttonVariants({ variant: 'link' }))}>About</Link>
      <ModeToggle />
    </nav>
  )
}
