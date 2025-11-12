import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { DriverApprovalStatus, UserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import AppError from "../utils/AppError";

export const checkDriverPending = async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    const driver = await User.findOne({email: user?.email});

    if(!driver) {
        throw new AppError(404, "Driver not found!");
    }

       if (
         driver.role === UserRole.driver &&
         driver.driverApprovalStatus === DriverApprovalStatus.pending
       ) {
         throw new AppError(
           400,
           "Your driving request on pending... Try Again Later!"
         );
       }

       next();
}