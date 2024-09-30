"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export const ThemeSelect = () => {
  const { setTheme, theme } = useTheme()

  const [currentTheme, setCurrentTheme] = useState('')

  useEffect(() => {
    if (theme) {
      setCurrentTheme(theme)
    }
  }, [theme])
  return (
    <div className=" space-y-4">
      <span className="text-muted-foreground text-lg font-semibold">Theme</span>
      <Select value={currentTheme} onValueChange={theme => setTheme(theme)}>
        <SelectTrigger className="w-[200px] shadow-none">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light" >Light</SelectItem>
          <SelectItem value="dark" >Dark</SelectItem>
          <SelectItem value="system" >System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

