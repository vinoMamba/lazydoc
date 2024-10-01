"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Command } from "lucide-react"
import { useEffect, useRef } from "react"
import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSearch = useDebouncedCallback((name: string) => {
    const params = new URLSearchParams(searchParams)
    if (name) {
      params.set('name', name)
    } else {
      params.delete('name')
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey && event.key === 'k') || (event.ctrlKey && event.key === 'k')) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  return (
    <div className="w-full relative">
      <Input
        placeholder="Search project"
        onChange={e => handleSearch(e.target.value)}
        ref={inputRef}
      />
      <kbd className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <Command className="w-[0.6rem] h-[0.6rem]" />K
      </kbd>
    </div>
  )
}
