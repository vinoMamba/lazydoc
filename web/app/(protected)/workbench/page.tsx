import { getProjectListAction, SearchParams } from "@/action/get-project-list";
import { AddProjectButton } from "@/components/project/add-project-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, TvMinimal } from "lucide-react";

export default async function WorkbenchPage({ searchParams }: { searchParams: SearchParams }) {
  const list = await getProjectListAction(searchParams)
  return (
    <div className="max-w-screen-lg px-4 mx-auto py-20">
      <div className="flex items-center gap-4 mb-4 sticky top-20 md:top-5 z-10  backdrop-blur max-w-screen-sm">
        <Input />
        <AddProjectButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
          list.map(p => (
            <div key={p.id} className="dark:bg-[#2c2c2c] dark:hover:bg-[#303030] bg-[#fafafa] hover:bg-[#f2f2f2] p-4  rounded-xl bg-card text-card-foreground shadow h-[180px] relative group flex flex-col">
              <header>
                <h6 className="sm:text-xl md:text-2xl font-semibold text-card-foreground opacity-70 group-hover:opacity-100">{p.name}</h6>
                <span className=" text-muted-foreground text-sm">{p.createdAt}</span>
              </header>
              <section>
                <p className=" text-muted-foreground text-sm italic line-clamp-3">{p.description}</p>
              </section>
              <div className="flex items-center justify-end gap-2 mt-auto">
                <Button size="sm" variant="link" className="flex items-center gap-1">
                  <TvMinimal className="w-[0.8rem] h-[0.8rem] text-muted-foreground" />
                  View
                </Button>
                <Button size="sm" variant="link" className="flex items-center gap-1">
                  <Edit className=" w-[0.8rem] h-[0.8rem] text-muted-foreground" />
                  Edit
                </Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
