"use client"

import { UserInfoSchema } from "@/schemas/user"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

export type UserItem = z.infer<typeof UserInfoSchema>

export const columns: ColumnDef<UserItem>[] = [
  {
    accessorKey: "index",
    header: "Index",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>
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
    accessorKey: "avatar",
    header: "Avatar",
  },
]
