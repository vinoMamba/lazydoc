import { z } from "zod";

export const DocItemSchema = z.object({
  id: z.string(),
  parentId: z.string().optional(),
  name: z.string(),
  isFolder: z.boolean(),
  isPin: z.boolean(),
  createdBy: z.string().optional(),
  createdAt: z.string().optional(),
})

export const DocListSchema = z.array(DocItemSchema)


export const CreateFileSchema = z.object({
  name: z.string(),
  projectId:z.string(),
  parentId: z.string().optional(),
  isFolder: z.boolean(),
})
