"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FolderCheck } from "lucide-react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreateProjectSchema } from "@/schemas/project"
import { createProjectAction } from "@/action/create-project"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const AddProjectButton = () => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof CreateProjectSchema>>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: ''
    },
  })

  const handleClick = () => {
    form.reset()
    setOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { code, message } = await createProjectAction(values)
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
    <>
      <Button className="flex items-center gap-1" onClick={handleClick}>
        <FolderCheck className="w-[1rem] h-[1rem]" />
        Add project
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="description"
                          className="resize-none"
                          {...field}
                        />
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
    </>
  )
}
