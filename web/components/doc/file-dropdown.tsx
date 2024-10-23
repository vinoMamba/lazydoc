"use client"

import { FilePlus2, FolderPlus, PencilLine, Settings2, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DocItemType } from "@/schemas/doc"
import { AddFileButton } from "./add-file-button"
import { DeleteFileButton } from "./delete-file-button"
import { MouseEventHandler } from "react"
import { NodeApi } from "react-arborist"

type Props = {
  node: NodeApi<DocItemType>
  projectId: string
}

export const FileItemDorpDown = ({ node, projectId }: Props) => {

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    node.edit()
  }
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Settings2 className="group-hover:block hidden w-[1rem] h-[1rem] absolute top-1/2 -translate-y-1/2 right-2 z-50 " onClick={(e) => e.stopPropagation()} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" className="w-56">
          <DropdownMenuItem onClick={handleClick} className="flex items-center gap-2">
            <PencilLine className="w-[1rem] h-[1rem]" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {node.data.isFolder && (
            <>
              <AddFileButton projectId={projectId} parentId={node.data.id}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FilePlus2 className="w-[1rem] h-[1rem]" />
                  New file
                </DropdownMenuItem>
              </AddFileButton>
              <AddFileButton projectId={projectId} isFolder parentId={node.data.id}>
                <DropdownMenuItem className="flex items-center gap-2">
                  <FolderPlus className="w-[1rem] h-[1rem]" />
                  New folder
                </DropdownMenuItem>
              </AddFileButton>

            </>
          )}
          <DeleteFileButton fileId={node.data.id} node={node}>
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash2 className="w-[1rem] h-[1rem]" />
              Delete
            </DropdownMenuItem>
          </DeleteFileButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
