import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const getAllUser = catchAsync(async(req: Request, res: Response) => {
  const data = await UserService.getAllUser();

  sendResponse(res, {
    statusCode: 200,
    message: "Users retrived successfully",
    data,
  });
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: 200,
    message: "User retrived successfully",
    data,
  });
});

export const UserController = {
  getAllUser,
  getSingleUser
};