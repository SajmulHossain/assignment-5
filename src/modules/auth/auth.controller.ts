import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const register = async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body)
  
  sendResponse(res, {
    data: user,
    message: "User created successfully",
    statusCode: 201
  })
};
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