"use server"

import { resErr, resOk } from "@/lib/response"
import {  UpdatePasswordSchema } from "@/schemas/auth"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"


export const updateUserPasswordlAction = async (value: z.infer<typeof UpdatePasswordSchema>) => {
  const validateValue = UpdatePasswordSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("Please enter a valid data.")
  }
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/user/password", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("update password successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("update password failed. Please try again.")
  }
}
