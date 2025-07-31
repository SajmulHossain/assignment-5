/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import AppError from "../../utils/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { setToken } from "../../utils/setToken";
import { createToken } from "../../utils/token";
import { DriverApprovalStatus, IUser, UserRole } from "../user/user.interface";
import { AuthService } from "./auth.service";

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

        if(user?.isBlocked) {
          return next(new AppError(400, "You are blocked"));
        }

        if (user.role === UserRole.rider && user.isBlocked) {
          return next(new AppError(400, "Your accont is blocked"));
        }

        if (
          user.role === UserRole.driver &&
          user.driverApprovalStatus === DriverApprovalStatus.suspend
        ) {
          return next(new AppError(401, "Your account is suspended"));
        }

        const { password, ...rest } = user;

        const token = createToken(rest);
        setToken(res, token);

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
