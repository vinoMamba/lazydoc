import { z } from "zod";

export const UserInfoSchema = z.object({
  userId: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().optional(),
  isSuper: z.boolean()
})
