import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {  
  const user = await AuthService.register(req.body);
  
  sendResponse(res, {
    data: user,
    message: "User created successfully",
    statusCode: 201,
  });
});
const login = async () => {
  return;
};
const changePassword = async () => {
  return;
};
const resetPassword = async () => {
  return;
};
const forgotPassword = async () => {
  return;
};

export const AuthController = {
  register,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
};