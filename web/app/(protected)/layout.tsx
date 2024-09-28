import { BottomNavList } from "@/components/bottom-nav-list";
import { Logo } from "@/components/logo";
import { NavList } from "@/components/nav-list";
import { SheetNavList } from "@/components/sheet-nav-list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col h-screen">
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
        <header className="fixed backdrop-blur w-full top-0 z-30 flex h-14 items-center justify-between gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent md:hidden sm:hidden">
          <SheetNavList />
          <Logo />
          <UserAvatar />
        </header>
        <div className="w-full h-full mt-14 sm:mt-0 pl-0 sm:pl-14">
          {children}
        </div>
      </TooltipProvider>
    </main>
  )
}
