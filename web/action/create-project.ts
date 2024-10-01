"use server"

import { resErr, resOk } from "@/lib/response"
import { CreateProjectSchema } from "@/schemas/project"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"


export const createProjectAction = async (value: z.infer<typeof CreateProjectSchema>) => {
  const validateValue = CreateProjectSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("Please enter a valid data.")
  }
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getProjectList")
      return resOk("create project successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("create project failed. Please try again.")
  }
}
