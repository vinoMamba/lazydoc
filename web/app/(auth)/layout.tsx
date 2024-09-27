
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      {children}
    </main>
  )
}
