"use client"

import { createFileAction } from "@/action/create-file"
import { useFileStore } from "@/store/use-file"
import { MouseEventHandler, ReactNode } from "react"

type Props = {
  projectId: string
  parentId?: string
  isFolder?: boolean
  children: ReactNode
}

export const AddFileButton = ({ projectId, children, isFolder = false, parentId }: Props) => {
  const updateCurrentEditFileId = useFileStore(s => s.updateCurrentEditFileId)

  const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    const { code, data } = await createFileAction({
      name: isFolder ? '新建文件夹' : '新建文件',
      projectId,
      isFolder,
      parentId
    })

    if (code === 200) {
      updateCurrentEditFileId(data)
    }
  }
  return (
    <div onClick={onClick} className="w-full">
      {children}
    </div>
  )
}
