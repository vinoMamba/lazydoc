"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

export const ThemeSelect = () => {
  const { setTheme } = useTheme()
  const theme = window.localStorage.getItem('theme')
  return (
    <div className=" space-y-4">
      <span className="text-muted-foreground text-lg font-semibold">Theme</span>
      <Select defaultValue={theme || ""} onValueChange={theme => setTheme(theme)}>
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

