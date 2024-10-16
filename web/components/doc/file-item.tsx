"use client"
import { cn } from "@/lib/utils"
import { DocItemSchema } from "@/schemas/doc"
import { z } from "zod"
import { FileItemDorpDown } from "./file-dropdown"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  file: z.infer<typeof DocItemSchema>
  projectId: string
}

export const FileItem = ({ file, projectId }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const handleClick = () => {
    router.push(`/workbench/${projectId}/${file.id}`)
  }


  return (
    <div>
      <div
        onClick={handleClick}
        className={cn("w-full hover:bg-muted flex justify-between text-xs p-2 rounded-sm group relative cursor-pointer", pathname.split("/")[3] === file.id && "bg-muted")}>
        {file.name}
        <FileItemDorpDown file={file} projectId={projectId} />
      </div>
      {file.children && file.children.length > 0 && (
        <div>
          {file.children.map(child => (
            <FileItem key={child.id} file={child} projectId={projectId} />
          ))}
        </div>
      )}
    </div>
  )
}
