"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const delUserAction = async (userId: string) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/user?userId=${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("delete user successful")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.error(error)
    return resErr("delete user failed. Please try again.")
  }
}
