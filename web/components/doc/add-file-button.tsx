"use client"

import { createFileAction } from "@/action/create-file"
import { MouseEventHandler, ReactNode } from "react"

type Props = {
  projectId: string
  parentId?: string
  isFolder?: boolean
  children: ReactNode
}

export const AddFileButton = ({ projectId, children, isFolder = false, parentId }: Props) => {
  const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    await createFileAction({
      name: isFolder ? '新建文件夹' : '新建文件',
      projectId,
      isFolder,
      parentId
    })
  }
  return (
    <div onClick={onClick} className="w-full">
      {children}
    </div>
  )
}
