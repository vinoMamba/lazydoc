"use client"

import { UserInfoSchema } from "@/schemas/user"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstStr } from "@/lib/string"
import { DelUserButton } from "./del-user-button"

export type UserItem = z.infer<typeof UserInfoSchema>

export const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: "index",
    header: () => <div className="ml-2">Index</div>,
    cell: ({ row }) => {
      return <div className="ml-2">{row.index + 1}</div>
    }
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const fallbackStr = getFirstStr(row.original.username || "CN")
      return (
        <Avatar className="w-[2rem] h-[2rem]">
          <AvatarImage src={row.original.avatar} alt={row.original.username} />
          <AvatarFallback className="text-muted-foreground">{fallbackStr}</AvatarFallback>
        </Avatar>
      )
    }
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <DelUserButton userId={row.original.userId} />
      )
    }
  },
]
