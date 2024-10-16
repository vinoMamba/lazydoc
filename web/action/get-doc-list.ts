"use server"

import { DocListSchema } from "@/schemas/doc"
import { cookies } from "next/headers"



export const getDocList = async ({ projectId = '' }: { projectId: string }) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/doc/list?projectId=${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getDocRootList']
      }
    })

    const json = await result.json();
    const docList = DocListSchema.safeParse(json)
    if (docList.success) {
      return docList.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
