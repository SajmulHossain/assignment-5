import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { DriverService } from "./driver.service";

const approveDriver = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await DriverService.approveDriver(id);

  sendResponse(res, {
    statusCode: 200,
    message: "Driver Status Updated successfully",
    data,
  });
});

const suspendDriver = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const data = await DriverService.suspendDriver(id);

  sendResponse(res, {
    statusCode: 200,
    message: "Driver Status Updated successfully",
    data,
  });
});

const updateDriverActiveStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user as JwtPayload;
    const data = await DriverService.updateDriverActiveStatus(id);

    sendResponse(res, {
      statusCode: 200,
      message: "Status Updated successfully",
      data,
    });
  }
);

export const DriverController = {
  suspendDriver,
  approveDriver,
  updateDriverActiveStatus,
};