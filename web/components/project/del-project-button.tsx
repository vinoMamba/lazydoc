"use client"

import { delProjectAction } from "@/action/del-project"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  projectId: string
}

export const DelProjectButton = ({ projectId }: Props) => {
  const [open, setOpen] = useState(false)
  const handleDelete = async () => {
    const { code, message } = await delProjectAction(projectId)
    if (code === 200) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  return (
    <>
      <Button size="sm" variant="link" className="flex items-center gap-1 mx-0 px-0" onClick={() => setOpen(true)}>
        <Trash2 className=" w-[1rem] h-[1rem]" />
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
