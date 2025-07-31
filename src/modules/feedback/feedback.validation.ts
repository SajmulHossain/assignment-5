import z from "zod";

export const createFeedbackZodSchema = z.object({
  rating: z.number().min(1).max(5),
  feedback: z.string(),
  ride_info: z.string(),
});