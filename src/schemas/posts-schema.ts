import z from 'zod'

export const postsSchema = z.object({
    _id: z.string(),
    content: z.string(),
    userId: z.string(),
    fecha: z.string(),
    name: z.string()
})

export type postsType = z.infer<typeof postsSchema>