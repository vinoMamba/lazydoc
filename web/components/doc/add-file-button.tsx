"use client"

import { createFileAction } from "@/action/create-file"
import { useFileStore } from "@/store/use-file"
import { ReactNode } from "react"

type Props = {
  projectId: string
  isFolder?: boolean
  children: ReactNode
}

export const AddFileButton = ({ projectId, children, isFolder = false }: Props) => {
  const updateCurrentEditFileId = useFileStore(s => s.updateCurrentEditFileId)

  const onClick = async () => {
    const { code, data } = await createFileAction({
      name: isFolder ? '新建文件夹' : '新建文件',
      projectId,
      isFolder
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
