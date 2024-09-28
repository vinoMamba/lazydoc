"use client"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { UpdateEmailSchema } from "@/schemas/auth"
//import { toast } from "sonner"
//import { logoutAction } from "@/action/logout"

type Props = {
  email?: string
}

export const EmailDialog = ({ email = "" }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdateEmailSchema>>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      email,
    }
  })

  const onSubmit = form.handleSubmit(async () => {
    //try {
    //  const { code, message } = await updateEmailAction(values)
    //  if (code === 200) {
    //    toast.success(message)
    //    logoutAction()
    //  } else {
    //    toast.error(message)
    //    form.setValue('email', email)
    //  }
    //} finally {
    //  setOpen(false)
    //}
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className={cn(buttonVariants({ size: 'sm' }))}>Change email</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className=" flex items-center gap-x-1">
            <span>Your current email is </span>
            <b> {email}</b>
            <span>.</span>
          </div>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            You will be logged out after changing your email.
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className=" space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter your password.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter you new email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Change email
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
