import z from "zod";

export const createUserZodSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(8)
})