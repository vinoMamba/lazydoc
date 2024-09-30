import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20)
})

export const UpdateEmailSchema = z.object({
  email: z.string().email(),
})

export const UpdatePasswordSchema = z.object({
  oldPassword: z.string().min(6).max(20),
  newPassword: z.string().min(6).max(20)
})
