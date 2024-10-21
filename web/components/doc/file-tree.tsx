"use client"
import { Button } from "@/components/ui/button"
import { FilePlus2, FolderPlus } from "lucide-react"
import { AddFileButton } from "./add-file-button"
import { Separator } from "@/components/ui/separator"
import { DocItemType } from "@/schemas/doc"
import { NodeApi, Tree } from "react-arborist"
import { FileItem } from "./file-item"
import { FileItemDorpDown } from "./file-dropdown"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  projectId: string
  list: DocItemType[]
}

export const FileTree = ({ projectId, list }: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const handleNodeClick = (node: NodeApi<DocItemType>) => {
    router.push(`/workbench/${projectId}/${node.data.id}`)
  }
  return (
    <div>
      <header className=" flex items-center justify-around mx-2">
        <AddFileButton projectId={projectId} >
          <Button variant="ghost" className="flex items-center gap-1 w-full" size="sm">
            <FilePlus2 className="w-[1rem] h-[1rem]" />
            Add File
          </Button>
        </AddFileButton>
        <Separator orientation="vertical" className="h-4 mx-2" />
        <AddFileButton projectId={projectId} isFolder>
          <Button variant="ghost" className="flex items-center gap-1 w-full" size="sm">
            <FolderPlus className="w-[1rem] h-[1rem]" />
            Add Folder
          </Button>
        </AddFileButton>
      </header>
      <div className="mx-2 my-2 space-y-1">
        <Tree
          data={list}
          width={240}
          rowHeight={40}
        >
          {({ node, style, dragHandle }) => (
            <div style={style}
              ref={dragHandle}
              onClick={() => handleNodeClick(node)}
              className={
                cn(
                  "flex items-center justify-between group relative text-xs hover:bg-muted h-full",
                  pathname.split("/")[3] === node.data.id && "bg-muted"
                )
              }
            >
              <FileItem node={node} propjectId={projectId} />
              {!node.isEditing && <FileItemDorpDown node={node} projectId={projectId} />}
            </div>
          )}
        </Tree>
      </div>
    </div>
  )
}
