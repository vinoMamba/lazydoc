import { getProjectListAction, SearchParams } from "@/action/get-project-list";
import { getUserInfoAction } from "@/action/get-user-info";
import { AddProjectButton } from "@/components/project/add-project-button";
import { EmptyList } from "@/components/project/empty-list";
import { ProjectCard } from "@/components/project/project-card";
import { SearchInput } from "@/components/project/search-project-input";

export default async function WorkbenchPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const list = await getProjectListAction(searchParams)
  const userInfo = await getUserInfoAction()
  return (
    <div className="max-w-screen-lg px-4 mx-auto py-20">
      <div className="flex items-center gap-4 mb-4 sticky top-20 md:top-5 z-10  backdrop-blur ">
        <SearchInput />
        <AddProjectButton />
      </div>
      {
        list.length > 0
          ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {list.map(p => (
              <ProjectCard key={p.id} project={p} showActionButton={userInfo?.userId === p.createdBy || userInfo?.isSuper} />
            ))}
          </div>)
          : <EmptyList />
      }
    </div>
  )
}
