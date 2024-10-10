import { FileTree } from "@/components/doc/file-tree"
import { ProjectInfo } from "@/components/project/project-info"

export default function ProjectLayout({ children, params }: { children: React.ReactNode, params: { projectId: string } }) {
  return (
    <main className="flex gap-2 h-full">
      <aside className="flex-col gap-2 w-64 hidden md:flex sm:flex border-r shrink-0">
        <ProjectInfo projectId={params.projectId} />
        <FileTree projectId={params.projectId} />
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
