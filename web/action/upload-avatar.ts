"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export async function updateAvatarAction(formData: FormData) {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/user/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    const json = await result.json()
    if (result.status === 200) {
      revalidateTag("getUserInfo")
      return resOk("ok")
    } else {
      return resErr(json.message)
    }
  } catch (error) {
    console.log(error)
    return resErr("internal server error")
  }
}

