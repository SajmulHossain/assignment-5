import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import AppError from "../../utils/AppError";
import { JwtPayload } from "jsonwebtoken";

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

const updateUser = catchAsync(async(req: Request, res: Response) => {
  const { email } = req.params;

  if ((req?.user as JwtPayload).email !== email) {
    throw new AppError(403, "Unauthorized operation");
  }
  
  const data = await UserService.updateUser(email, req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "User Updated successfully",
      data,
    });
});

const userBlockUpdate = catchAsync(async(req: Request, res: Response) => {
  const { id } = req.params;

  const data = await UserService.userBlockUpdate(id);
  
   sendResponse(res, {
     statusCode: 200,
     message: "User Block Status Updated Successfully",
     data,
   });
});

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  userBlockUpdate,
};