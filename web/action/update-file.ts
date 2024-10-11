"use server"

import { resErr, resOk } from "@/lib/response"
import { UpdateFileSchema } from "@/schemas/doc"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

export const updateFileAction = async (value: z.infer<typeof UpdateFileSchema>) => {
  const validateValue = UpdateFileSchema.safeParse(value)
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/doc", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getDocRootList")
      return resOk("update file successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("update file failed. Please try again.")
  }
}

