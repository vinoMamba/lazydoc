"use client"

import { delFileAction } from "@/action/del-file"
import { DocItemType } from "@/schemas/doc"
import { MouseEventHandler, ReactNode } from "react"
import { NodeApi } from "react-arborist"

type Props = {
  node: NodeApi<DocItemType>
  fileId: string
  children: ReactNode
}

export const DeleteFileButton = ({ fileId, children, node }: Props) => {
  const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    await delFileAction({
      docId: fileId,
      preDocId: node.data.preDocId || "",
      nextSiblingId: node.nextSibling?.data.id || ""
    })
    // TODO: go to prev node maybe
    if (node.isFocused) {
       
    }
  }
  return (
    <div onClick={onClick} className="w-full">
      {children}
    </div>
  )
}
