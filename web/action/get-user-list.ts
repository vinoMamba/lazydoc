"use server"

import { UserListSchema } from "@/schemas/user"
import { cookies } from "next/headers"


export type SearchParams = {
  pageNum: number
  condition?: string
}

export const getUserListAction = async ({ pageNum, condition = '' }: SearchParams) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/user/list?pageSize=10&pageNum=${pageNum}&condition=${condition}`, {
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
    const userInfo = UserListSchema.safeParse(json)
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
