
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      {children}
    </main>
  )
}
