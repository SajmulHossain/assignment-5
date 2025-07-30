import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "../user/user.interface";
import { RideService } from "./ride.service";

const createRide = catchAsync(async (req: Request, res: Response) => {
  const data = await RideService.createRide(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Ride Created Successfully",
    data,
  });
});

const updateRideStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await RideService.updateRideStatus(
    id,
    req.body as Record<string, string>,
    req.user as IUser
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Ride Status updated successfully",
    data,
  });
});

export const RideController = {
  createRide,
  updateRideStatus,
};
