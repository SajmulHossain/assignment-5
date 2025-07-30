/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "../user/user.interface";
import { AuthService } from "./auth.service";
import AppError from "../../utils/AppError";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body);

  sendResponse(res, {
    data: user,
    message: "User created successfully",
    statusCode: 201,
  });
});

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      async (error: any, user: IUser, info: { message: string }) => {
        if (error) {
          return next(error);
        }

        if (!user) {
          return next(new AppError(401, info.message));
        }

        const { password, ...rest } = user;

        sendResponse(res, {
          statusCode: 200,
          message: "User Logged in Successfully",
          data: rest,
        });
      }
    )(req, res, next);
  }
);

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
