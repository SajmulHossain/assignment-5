import z from "zod";

export const loginZodSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const changePasswordZodSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
})