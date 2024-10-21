"use client"

import { cn } from "@/lib/utils"
import { DocItemType } from "@/schemas/doc"
import { FileCode, Folder, FolderOpen } from "lucide-react"
import { MouseEvent } from "react"
import { NodeApi } from "react-arborist"
import { FileInput } from "./file-input"

type Props = {
  node: NodeApi<DocItemType>
  propjectId: string
}

export const FileItem = ({ node, propjectId }: Props) => {
  const handleIconClick = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    node.toggle()
  }
  return (
    <div
      className={cn(
        "pl-2 flex items-center gap-1 w-full p-2",
      )}
    >
      {
        node.data.isFolder
          ? node.isClosed
            ? <Folder className="w-[1rem] h-[1rem]" onClick={(e) => handleIconClick(e)} />
            : <FolderOpen className="w-[1rem] h-[1rem]" onClick={(e) => handleIconClick(e)} />
          : <FileCode className="w-[1rem] h-[1rem]" />
      }
      {node.isEditing
        ? <FileInput node={node} />
        : <span>{node.data.name}</span>}
    </div>
  )
}
