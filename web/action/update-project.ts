"use server"

import { resErr, resOk } from "@/lib/response"
import { UpdateProjectSchema } from "@/schemas/project"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"


export const updateProjectAction = async (value: z.infer<typeof UpdateProjectSchema>) => {
  const validateValue = UpdateProjectSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("Please enter a valid data.")
  }
  const body = {
    ...validateValue.data,
    isPublic: validateValue.data.isPublic === "public" ? true : false
  }
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/project", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getProjectList")
      return resOk("update project successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("update project failed. Please try again.")
  }
}
