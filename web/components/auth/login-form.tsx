"use client"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LoginSchema } from "@/schemas/auth"
import { loginAction } from "@/action/login"
import { toast } from "sonner"

export const LoginForm = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "123456"
    },
  })

  const onSubmit = form.handleSubmit(values => {
    loginAction(values).then(res => {
      const { code, message } = res
      if (code === 200) {
        toast.success(message)
        router.push('/workbench')
      } else {
        toast.error(message)
      }
    })
  })
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className=" space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example@gmail.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  )
}
