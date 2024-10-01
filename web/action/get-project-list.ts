"use server"

import { ProjectListSchema } from "@/schemas/project"
import { cookies } from "next/headers"


export type SearchParams = {
  projectName?: string
}

export const getProjectListAction = async ({ projectName = '' }: SearchParams) => {
  try {
    const token = cookies().get('token')?.value
    const result = await fetch(`${process.env.NEXT_API_URL}/project/list?name=${projectName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      next: {
        tags: ['getProjectList']
      }
    })

    const json = await result.json();
    const projectList = ProjectListSchema.safeParse(json)
    if (projectList.success) {
      return projectList.data
    } else {
      return []
    }
  } catch (error) {
    console.error(error)
    return []
  }
}
