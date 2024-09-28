"use server"

import { UserInfoSchema } from "@/schemas/uset"
import { cookies } from "next/headers"


export const getUserInfoAction = async () => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getUserInfo']
      }
    })
    const json = await result.json();
    const userInfo = UserInfoSchema.safeParse(json)
    if (userInfo.success) {
      return userInfo.data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
