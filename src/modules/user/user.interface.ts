import { Types } from "mongoose";

export enum UserRole {
  admin = "admin",
  rider = "rider",
  driver = "driver",
}

export enum DriverApprovalStatus {
  approve="approve",
  suspend="suspend",
  pending="pending"
}

export interface IVehice {
  model: string;
  registration_no: string;
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  isBlocked?: boolean;
  
  driverApprovalStatus: DriverApprovalStatus;
  isDriverActive: boolean;
  vehicleInfo: IVehice

  createdAt?: Date;
  updatedAt?: Date;
}
