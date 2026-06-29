import z from 'zod'

export const userSchema = z.object({
    _id: z.string(),
    name: z.string()
})

export type userType = z.infer<typeof userSchema>