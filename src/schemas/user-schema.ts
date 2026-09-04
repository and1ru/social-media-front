import z from 'zod'

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    relation: z.string()
})

export type userType = z.infer<typeof userSchema>