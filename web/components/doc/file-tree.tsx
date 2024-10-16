
import { getDocList } from "@/action/get-doc-list"
import { Button } from "@/components/ui/button"
import { FilePlus2, FolderPlus } from "lucide-react"
import { AddFileButton } from "./add-file-button"
import { FileItem } from "./file-item"
import { Separator } from "@/components/ui/separator"



export const FileTree = async ({ projectId }: { projectId: string }) => {
  const list = await getDocList({ projectId })

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
        {
          list.map(file => (
            <FileItem
              projectId={projectId}
              file={file}
              key={file.id}
            />
          ))
        }
      </div>
    </div>
  )
}
