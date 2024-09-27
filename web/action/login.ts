"use server"

import { resErr, resOk } from "@/lib/response"
import { LoginSchema } from "@/schemas/auth"
import { cookies } from "next/headers"
import { z } from "zod"


export const loginAction = async (value: z.infer<typeof LoginSchema>) => {
  const validateValue = LoginSchema.safeParse(value)
  if (!validateValue.success) {
    return resErr("Please enter a valid data.")
  }
  try {
    const result = await fetch(process.env.NEXT_API_URL + "/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateValue.data),
    })
    const json = await result.json();
    if (result.status === 200) {
      cookies().set("token", json.token, { maxAge: 60 * 60 * 24 * 3 })
      return resOk("login successful")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("login failed. Please try again.")
  }
}
