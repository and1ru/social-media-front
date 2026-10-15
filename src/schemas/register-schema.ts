import z from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Must be an email"),
    password: z.string().min(8, "Password must be at least 8 length"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 length")
}).refine(data => data.password === data.confirmPassword, {
    message: "no match passwords",
    path: ["confirmPassword"]
})

// refine dice que password y confirmPassword deben de ser iguales
// si no son iguales mostrara algo

export type registerType = z.infer<typeof registerSchema>