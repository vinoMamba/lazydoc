"use server"

import { resErr, resOk } from "@/lib/response"
import { CreatUserSchema } from "@/schemas/user"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"


export const createUserAction = async (value: z.infer<typeof CreatUserSchema>) => {
  const validateValue = CreatUserSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("Please enter a valid data.")
  }
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("create user successful")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("create user failed. Please try again.")
  }
}
