"use server"

import { UserListSchema } from "@/schemas/user"
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
    return json
    const userList = UserListSchema.safeParse(json)
    if (userList.success) {
      return userList.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
