"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"

export const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (name: string) => {
    const params = new URLSearchParams(searchParams)
    if (name) {
      params.set('name', name)
    } else {
      params.delete('name')
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <Input placeholder="Search project" onChange={e => handleSearch(e.target.value)} />
  )
}
