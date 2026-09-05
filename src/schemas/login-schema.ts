import z from 'zod'

export const loginSchema = z.object({
    email: z.email("must be an email"),
    password: z.string().min(1, "this field is required"),
})

export type loginType = z.infer<typeof loginSchema>