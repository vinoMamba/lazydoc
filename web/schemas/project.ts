import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string(),
  isPublic: z.enum(["public", "private"]).optional(),
  description: z.string().max(100).optional()
})

export const UpdateProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  isPublic: z.enum(["public", "private"]).optional(),
  description: z.string().max(100).optional()
})

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().max(20).min(1),
  isDeleted: z.boolean().optional(),
  isPublic: z.boolean(),
  description: z.string().max(100).optional(),
  createdAt: z.string(),
  createdBy: z.string(),
})

export const ProjectListSchema = z.array(ProjectSchema)
