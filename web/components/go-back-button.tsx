"use client"

import {  usePathname, useRouter } from "next/navigation"
import { Button } from "./ui/button"

export const GoBack = () => {
  const router = useRouter()
  const pathname = usePathname()
  const handleClick = ()=>{
    const pathArr = pathname.split("/")
    pathArr.pop()
    const replaceUrl = pathArr.join("/")
    router.replace(replaceUrl)
  }
  return <Button size="sm" variant="secondary" onClick={handleClick}>Go back</Button>
}
