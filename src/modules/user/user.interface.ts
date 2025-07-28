import { Types } from "mongoose";

export enum UserRole {
  admin = "admin",
  rider = "rider",
  driver = "driver",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;

  createdAt?: Date;
  updatedAt?: Date;
}
