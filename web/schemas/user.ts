import { z } from "zod";

export const UserInfoSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  isSuper: z.boolean()
})

export const UserListSchema = z.array(UserInfoSchema)

export const CreatUserSchema = z.object({
  username: z.string().max(10).min(2),
  email: z.string().email(),
})
