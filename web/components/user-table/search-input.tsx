"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (username: string) => {
    const params = new URLSearchParams(searchParams)
    if (username) {
      params.set('condition', username)
    } else {
      params.delete('condition')
    }
    params.set('pageNum', '1')
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Input placeholder="Search user" onChange={e => handleSearch(e.target.value)} />
  )
}
