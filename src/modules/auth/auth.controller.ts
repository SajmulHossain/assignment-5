import { Request, Response } from "express";
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from "../../config/env.config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {  
  const user = await AuthService.register(req.body);

  
  const jwtPayload = {
    name: user.name,
    email: user.email,
  }
const token = jwt.sign(jwtPayload,env.jwt.jwt_access_secret,{
  expiresIn: env.jwt.jwt_access_exp
} as SignOptions)

res.cookie("token", token, {
  httpOnly: true,
  sameSite: true,
  secure: false
})
  
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