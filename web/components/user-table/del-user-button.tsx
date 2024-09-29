"use client"

import { delUserAction } from "@/action/del-user"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  userId: string
}

export const DelUserButton = ({ userId }: Props) => {
  const [open, setOpen] = useState(false)
  const handleDelete = async () => {
    const { code, message } = await delUserAction(userId)
    if (code === 200) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  return (
    <>
      <div className="flex items-center gap-1">
        <Button variant="secondary" className="flex items-center gap-1" size="sm" onClick={() => setOpen(true)}>
          <Trash2 className="w-[1rem] h-[1rem]" />
          Delete
        </Button>
      </div>
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
