
import { getDocRootListAction } from "@/action/get-doc-root-list"
import { Button } from "../ui/button"
import { File, Folder } from "lucide-react"
import { AddFileButton } from "./add-file-button"
import { FileItem } from "./file-item"



export const FileTree = async ({ projectId }: { projectId: string }) => {
  const list = await getDocRootListAction({ projectId })

  return (
    <div>
      <header className="grid grid-cols-2 gap-2 mx-2">
        <AddFileButton projectId={projectId} >
          <Button variant="ghost" className="flex items-center gap-1 w-full" size="sm">
            <File className="w-[1rem] h-[1rem]" />
            Add File
          </Button>
        </AddFileButton>
        <AddFileButton projectId={projectId} isFolder >
          <Button variant="ghost" className="flex items-center gap-1" size="sm">
            <Folder className="w-[1rem] h-[1rem]" />
            Add Folder
          </Button>
        </AddFileButton>
      </header>
      <div className="mx-2 my-2 space-y-1">
        {
          list.map(file => (
            <FileItem projectId={projectId} file={file} key={file.id} />
          ))
        }
      </div>
    </div>
  )
}
