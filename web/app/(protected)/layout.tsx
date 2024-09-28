import { BottomNavList } from "@/components/bottom-nav-list";
import { NavList } from "@/components/nav-list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <TooltipProvider >
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <UserAvatar />
            <NavList />
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <BottomNavList />
          </nav>
        </aside>
        <div className="h-screen w-full pl-0 sm:pl-14">
          {children}
        </div>
      </TooltipProvider>
    </main>
  )
}
