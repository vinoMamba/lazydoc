"use server"

import { ProjectSchema } from "@/schemas/project"
import { cookies } from "next/headers"


export type SearchParams = {
  name?: string
}

export const getProjectInfoAction = async (projectId: string) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/project/${projectId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getProjectInfo']
      }
    })

    const json = await result.json();
    const project = ProjectSchema.safeParse(json)
    if (project.success) {
      return project.data
    } else {
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
