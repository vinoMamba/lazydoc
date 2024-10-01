import { getProjectListAction, SearchParams } from "@/action/get-project-list";
import { AddProjectButton } from "@/components/project/add-project-button";
import { ProjectCard } from "@/components/project/project-card";
import { SearchInput } from "@/components/project/search-project-input";

export default async function WorkbenchPage({ searchParams }: { searchParams: SearchParams }) {
  const list = await getProjectListAction(searchParams)
  return (
    <div className="max-w-screen-lg px-4 mx-auto py-20">
      <div className="flex items-center gap-4 mb-4 sticky top-20 md:top-5 z-10  backdrop-blur max-w-screen-sm">
        <SearchInput/>
        <AddProjectButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
