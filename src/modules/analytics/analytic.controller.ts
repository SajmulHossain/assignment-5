import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AnalyticService } from "./analytic.service";


const adminAnalytics = catchAsync(async(req, res) => {
  const data = await AnalyticService.adminAnalytics();

  sendResponse(res, {
    statusCode: 200,
    message: "Data retrived successfully",
    data
  })
})

const driverAnalytics = catchAsync(async(req, res) => {
  const data = await AnalyticService.driverAnalytics((req.user as JwtPayload).email as string);

  sendResponse(res, {
    statusCode: 200,
    message: "Data retrived successfully",
    data
  })
})
export const AnalyticController = {
    adminAnalytics,
    driverAnalytics
}