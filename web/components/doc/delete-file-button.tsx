"use client"

import { delFileAction } from "@/action/del-file"
import { MouseEventHandler, ReactNode } from "react"

type Props = {
  fileId: string
  children: ReactNode
}

export const DeleteFileButton = ({ fileId, children }: Props) => {
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    delFileAction(fileId)
  }
  return (
    <div onClick={onClick} className="w-full">
      {children}
    </div>
  )
}
