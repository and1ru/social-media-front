import z from 'zod'

export const messageSchema = z.object({
    message: z.string().min(1, ""),
    date: z.date(),
    user_id: z.number()
})

export type messageType = z.infer<typeof messageSchema>