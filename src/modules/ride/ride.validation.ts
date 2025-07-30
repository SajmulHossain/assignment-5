import z from "zod";
import { RideStatus } from "./ride.interface";

export const createRideZodSchema = z.object({
    pickup: z.object({
        place_name: z.string(),
        coordinate: z.array(z.number()),
    }),
    destination: z.object({
        place_name: z.string(),
        coordinate: z.array(z.number()),
    }),
    status: z.array(z.object({
        state: z.enum(Object.values(RideStatus)),
    })).default([{ state: RideStatus.requested }]),
    amount: z.number().optional()
})

export const updateRideZodSchema = z.object({
    status: z.string()
})