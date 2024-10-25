"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"


export const updateUsernameAction = async (username: string) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(process.env.NEXT_API_URL + "/user/username", {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username }),
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("update username successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("update username failed. Please try again.")
  }
}
