"use client"

import { DocItemSchema } from "@/schemas/doc"
import { useFileStore } from "@/store/use-file"
import { File, FileCode, Folder, PencilLine, Settings2, Trash2 } from "lucide-react"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { AddFileButton } from "./add-file-button"

type Props = {
  file: z.infer<typeof DocItemSchema>
  projectId: string
}
export const FileItem = ({ file, projectId }: Props) => {
  const currentEditFileId = useFileStore(s => s.currentEditFileId)
  const updateCurrentEditFileId = useFileStore(s => s.updateCurrentEditFileId)

  const handleClick = () => {
    updateCurrentEditFileId(file.id)
  }

  return (
    <>
      {
        currentEditFileId === file.id
          ? (<Input defaultValue={file.name} autoFocus className="text-sm h-6 rounded-sm" onBlur={() => updateCurrentEditFileId("")} />)
          : (
            <div className="flex items-center justify-between text-xs group hover:bg-muted p-2 rounded-sm relative">
              <div className="flex items-center gap-1 ">
                {file.isFolder ? (<Folder className="w-[1rem] h-[1rem]" />) : (<FileCode className="w-[1rem] h-[1rem]" />)}
                <span>{file.name}</span>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  <Settings2 className="group-hover:block hidden w-[1rem] h-[1rem] absolute top-1/2 -translate-y-1/2 right-2 " />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="right" className="w-56">
                  <DropdownMenuItem onClick={handleClick} className="flex items-center gap-2">
                    <PencilLine className="w-[1rem] h-[1rem]" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {file.isFolder && (
                    <>
                      <AddFileButton projectId={projectId} >
                        <DropdownMenuItem className="flex items-center gap-2">
                          <File className="w-[1rem] h-[1rem]" />
                          Add File
                        </DropdownMenuItem>
                      </AddFileButton>
                      <AddFileButton projectId={projectId} isFolder>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Folder className="w-[1rem] h-[1rem]" />
                          Add Folder
                        </DropdownMenuItem>
                      </AddFileButton>

                    </>
                  )}
                  <DropdownMenuItem className="flex items-center gap-2">
                    <Trash2 className="w-[1rem] h-[1rem]" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
      }
    </>
  )
}
