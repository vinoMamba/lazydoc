import { PenTool } from "lucide-react"

export const EmptyList = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-20">
      <PenTool className='w-10 h-10' />
      <p className=" mt-4 text-lg">Empty list</p>
    </div>
  )
}
