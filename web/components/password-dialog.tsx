"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Keyboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { UpdatePasswordSchema } from "@/schemas/auth"
import { useState } from "react"
import { updateUserPasswordlAction } from "@/action/update-password"
import { toast } from "sonner"
import { logoutAction } from "@/action/logout"

export const PasswordDialog = () => {
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    }
  })
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { code, message } = await updateUserPasswordlAction(values)
      if (code === 200) {
        toast.success(message)
        logoutAction()
      } else {
        toast.error(message)
      }
    } finally {
      setOpen(false)
      form.reset()
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: 'sm' }))}>Change password</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription></DialogDescription>
          <div className=" flex flex-col items-center justify-center gap-2 text-center">
            <Keyboard />
            <p className=" font-semibold">Change password</p>
            <span className=" text-muted-foreground text-sm">Use a password at least 6 letters long, or at least 20 characters long with both letters and numbers.</span>
          </div>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            You will be logged out after changing your password.
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter your old password.</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter you old password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter a new password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a new password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Change password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
