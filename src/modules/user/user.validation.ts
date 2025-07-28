import z from "zod";

export const createUserZodSchema = z.object({
    name: z.string("Name is required").min(2, "Name should atleast 2 characters"),
    email: z.email(),
    password: z.string().min(8)
})