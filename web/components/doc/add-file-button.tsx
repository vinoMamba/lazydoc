"use client"

import { createFileAction } from "@/action/create-file"
import { useFileTreeStore } from "@/store/use-file-tree"
import { MouseEventHandler, ReactNode } from "react"

type Props = {
  projectId: string
  parentId?: string
  isFolder?: boolean
  children: ReactNode
}

export const AddFileButton = ({ projectId, children, isFolder = false, parentId }: Props) => {
  const treeApi = useFileTreeStore(s => s.treeApi)
  const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    const { data } = await createFileAction({
      name: isFolder ? '新建文件夹' : '新建文件',
      projectId,
      isFolder,
      parentId
    })
    treeApi?.open(parentId || "")
    treeApi?.edit(data)
  }
  return (
    <div onClick={onClick} className="w-full">
      {children}
    </div>
  )
}
