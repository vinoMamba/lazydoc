"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ProjectSchema, UpdateProjectSchema } from "@/schemas/project"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateProjectAction } from "@/action/update-project"

type Props = {
  project: z.infer<typeof ProjectSchema>
}

export const EditProjectButton = ({ project }: Props) => {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof UpdateProjectSchema>>({
    resolver: zodResolver(UpdateProjectSchema),
    defaultValues: {
      id: project.id,
      name: project.name,
      description: project.description
    },
  })

  const handleClick = () => {
    form.reset()
    setOpen(true)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const { code, message } = await updateProjectAction(values)
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
      <Button size="sm" variant="link" className="flex items-center gap-1 mx-0 px-0" onClick={handleClick}>
        <Edit className=" w-[1rem] h-[1rem]" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-1/4">
          <DialogHeader>
            <DialogTitle>Update project</DialogTitle>
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
                <Button type="submit" className="w-full">Update</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
