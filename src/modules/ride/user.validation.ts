import z from "zod";
import { RideStatus } from "./ride.interface";

export const createRideZodSchema = z.object({
    rider: z.string(),
    driver: z.string(),
    pickup: z.object({
        place_name: z.string(),
        coordinate: z.array(z.number()),
    }),
    destination: z.object({
        place_name: z.string(),
        coordinate: z.array(z.number()),
    }),
    status: z.enum(Object.values(RideStatus)),
    number: z.number()
})

export const updateRideZodSchema = createRideZodSchema.pick({status: true})