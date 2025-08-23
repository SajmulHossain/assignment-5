import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.config";
import { DriverApprovalStatus, UserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import AppError from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";

export const checkAuth = (...roles: string[]) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      throw new AppError(403, "No access identifier");
    }

    const verifiedToken = verifyToken(accessToken, env.jwt.jwt_access_secret
    ) as JwtPayload;

    const isUserExist = await User.findOne({ email: verifiedToken.email });

    if (!isUserExist) {
      throw new AppError(404, "No user exist");
    }

    if (isUserExist.role === UserRole.rider && isUserExist.isBlocked) {
      throw new AppError(400, "User is not allowed to procced");
    }

    if (isUserExist.role === UserRole.driver && isUserExist.driverApprovalStatus === DriverApprovalStatus.suspend
    ) {
      throw new AppError(401, "Driver is not allowed to procced");
    }

    if (!roles.includes(isUserExist.role)) {
      throw new AppError(403, "You are not permitted");
    }

    req.user = verifiedToken;
    next();
  });
