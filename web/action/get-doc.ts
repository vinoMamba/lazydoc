"use server"

import { DocItemSchema } from "@/schemas/doc"
import { cookies } from "next/headers"



export const getDocInfo = async ({ docId = '', projectId = '' }: { docId: string, projectId: string }) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/doc?docId=${docId}&projectId=${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getDocInfo']
      }
    })

    const json = await result.json();
    const docItem = DocItemSchema.safeParse(json)
    if (docItem.success) {
      return docItem.data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
