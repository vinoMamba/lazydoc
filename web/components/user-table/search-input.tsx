"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((username: string) => {
    const params = new URLSearchParams(searchParams)
    if (username) {
      params.set('condition', username)
    } else {
      params.delete('condition')
    }
    params.set('pageNum', '1')
    replace(`${pathname}?${params.toString()}`);
  }, 300)
  return (
    <Input placeholder="Search user" onChange={e => handleSearch(e.target.value)} />
  )
}
