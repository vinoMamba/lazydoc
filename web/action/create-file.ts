"use server"

import { resErr, resOk } from "@/lib/response"
import { CreateFileSchema } from "@/schemas/doc"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export const createFileAction = async (value: z.infer<typeof CreateFileSchema>) => {
  const validateValue = CreateFileSchema.safeParse(value)
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getDocList")
      return resOk("create file successful", json)
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("create file failed. Please try again.")
  }
}

