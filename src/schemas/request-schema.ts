import z from 'zod'

export const requestSchema = z.object({
    _id: z.string(),
    userName: z.string()
})

export type requestType = z.infer<typeof requestSchema>