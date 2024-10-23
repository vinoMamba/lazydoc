"use server"

import { resErr, resOk } from "@/lib/response"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

type Params = {
  docId: string
  preDocId: string
  nextSiblingId: string
}

export const delFileAction = async ({ docId, preDocId, nextSiblingId }: Params) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/doc/${docId}?preDocId=${preDocId}&nextSiblingId=${nextSiblingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    })
    const json = await result.json();
    if (result.status === 200) {
      revalidateTag("getDocRootList")
      return resOk("delete file successful")
    } else {
      return resErr(json.error)
    }
  } catch (error) {
    console.error(error)
    return resErr("delete file failed. Please try again.")
  }
}
