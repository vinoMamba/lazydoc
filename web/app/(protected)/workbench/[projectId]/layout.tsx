import { ProjectInfo } from "@/components/project/project-info"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProjectLayout({ children, params }: { children: React.ReactNode, params: { projectId: string } }) {
  return (
    <main>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full"
      >
        <ResizablePanel defaultSize={12} minSize={10}>
          <div className="flex flex-col gap-2 w-full h-screen">
            <ProjectInfo projectId={params.projectId} />
            <Tabs defaultValue="file" className="mx-1">
              <TabsList className="w-full">
                <TabsTrigger value="file" className="w-full">File</TabsTrigger>
                <TabsTrigger value="pin" className="w-full">Pin</TabsTrigger>
              </TabsList>
              <TabsContent value="file" className="mx-1">file</TabsContent>
              <TabsContent value="pin" className="mx-1">pin</TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={88} minSize={60}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  )
}
