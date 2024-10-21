import { getDocList } from "@/action/get-doc-list"
import { FileTree } from "@/components/doc/file-tree"
import { ProjectInfo } from "@/components/project/project-info"

export default async function ProjectLayout({ children, params }: { children: React.ReactNode, params: { projectId: string } }) {
  const list = await getDocList({ projectId: params.projectId })
  return (
    <main className="flex gap-2 h-full">
      <aside className="flex-col w-64 hidden md:flex sm:flex border-r shrink-0">
        <ProjectInfo projectId={params.projectId} />
        <FileTree list={list} projectId={params.projectId} className="flex-1"/>
      </aside>
      <div className="w-full h-full">
        <header className="md:hidden sm:hidden block">
          <ProjectInfo projectId={params.projectId} />
        </header>
        {children}
      </div>
    </main>
  )
}
