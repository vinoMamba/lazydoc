"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserRoundPlus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreatUserSchema } from "@/schemas/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createUserAction } from "@/action/create-user"
import { toast } from "sonner"
import { DialogTitle } from "@radix-ui/react-dialog"

export const AddUserButton = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof CreatUserSchema>>({
    resolver: zodResolver(CreatUserSchema),
    defaultValues: {
      email: '',
      username: ''
    },
  })

  const handleClick = () => {
    form.reset()
    setOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { code, message } = await createUserAction(values)
      if (code === 200) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    } finally {
      setOpen(false)
    }
  })

  return (
    <div>
      <Button className="flex items-center gap-1" size="sm" onClick={handleClick}>
        <UserRoundPlus className=" w-[1rem] h-[1rem]" />
        Add user
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-1/4">
          <DialogHeader>
            <DialogTitle>Create user</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter email" type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Create</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
