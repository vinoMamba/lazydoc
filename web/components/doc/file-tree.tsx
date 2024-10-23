"use client"
import { Button } from "@/components/ui/button"
import { FilePlus2, FolderPlus } from "lucide-react"
import { AddFileButton } from "./add-file-button"
import { Separator } from "@/components/ui/separator"
import { DocItemType } from "@/schemas/doc"
import { NodeApi, Tree, TreeApi } from "react-arborist"
import { FileItem } from "./file-item"
import { FileItemDorpDown } from "./file-dropdown"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import useResizeObserver from "use-resize-observer";
import { useEffect, useRef } from "react"
import { useFileTreeStore } from "@/store/use-file-tree"

type Props = {
  className?: string
  projectId: string
  list: DocItemType[]
}

export const FileTree = ({ projectId, list, className }: Props) => {
  const treeRef = useRef<TreeApi<DocItemType> | null>(null);
  const setTreeApi = useFileTreeStore(s => s.setTreeApi)
  useEffect(() => {
    setTreeApi(treeRef.current)
  }, [setTreeApi])

  const { ref, height } = useResizeObserver();
  const pathname = usePathname()
  const router = useRouter()
  const handleNodeClick = (node: NodeApi<DocItemType>) => {
    router.push(`/workbench/${projectId}/${node.data.id}`)
  }

  useEffect(() => {
    treeRef.current?.focus(pathname.split("/")[3])
  }, [pathname])


  return (
    <div className={cn(className, "flex flex-col")}>
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
      <div className="mx-2 my-2 flex-grow" ref={ref}>
        <Tree
          ref={treeRef}
          data={list}
          height={height}
          width={240}
          rowHeight={40}
          openByDefault={false}
        >
          {({ node, style, dragHandle }) => (
            <div
              style={style}
              ref={dragHandle}
              onClick={() => handleNodeClick(node)}
              className={
                cn(
                  "flex items-center justify-between group relative text-xs hover:bg-muted h-full focus-visible:outline-none focus-visible:border-none",
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
