"use server"

import { UserInfoSchema } from "@/schemas/user"
import { cookies } from "next/headers"


export const getUserListAction = async () => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/user/list?pageSize=10&pageNum=1&username=1&email=111@qq.com", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getUserList']
      }
    })
    const json = await result.json();
    const userInfo = UserInfoSchema.safeParse(json)
    if (userInfo.success) {
      return userInfo.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
