import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { RideService } from "./ride.service";
import { sendResponse } from "../../utils/sendResponse";

const createRide = catchAsync(async(req: Request, res: Response) => {
    const data = await RideService.createRide(req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Ride Created Successfully",
        data
    })
})

export const RideController = {
    createRide
}