import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional()
})

export const UpdateProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional()
})

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().max(20).min(1),
  description: z.string().max(100).optional(),
  createdAt: z.string(),
})

export const ProjectListSchema = z.array(ProjectSchema)
