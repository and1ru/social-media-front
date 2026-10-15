import z from 'zod'

export const loginSchema = z.object({
    email: z.email("Must be an email"),
    password: z.string().min(1, "Password is required"),
})

export type loginType = z.infer<typeof loginSchema>