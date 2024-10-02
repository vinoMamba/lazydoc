import { PenTool } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href="/">
      <h1 className="inline-flex items-center gap-2  p-4 py-2 text-2xl text-purple-800">
        <PenTool />
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 bg-clip-text text-transparent font-semibold">
          <strong className=" font-bold">Lazy</strong>
          .doc
        </span>
      </h1>
    </Link>
  )
}
