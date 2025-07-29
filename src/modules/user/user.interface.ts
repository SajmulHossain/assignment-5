import { Types } from "mongoose";

export enum UserRole {
  admin = "admin",
  rider = "rider",
  driver = "driver",
}

export enum DriverApprovalStatus {
  approve="approve",
  suspend="suspend"
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  isBlocked?: boolean;
  
  driverStatus?: boolean;
  driverApprovalStatus: DriverApprovalStatus;
  isDriverActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
