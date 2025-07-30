import { model, Schema } from "mongoose";
import {
  DriverApprovalStatus,
  IUser,
  IVehice,
  UserRole,
} from "./user.interface";

const vehicleModel = new Schema<IVehice>(
  {
    model: {
      type: String,
      required: true,
    },
    registraion_no: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    versionKey: false,
  }
);
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      // required: [true, "Name is required"],
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      // unique: [true,"Email Already Exist"],
      unique: true,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isBlocked: Boolean,

    role: {
      type: String,
      enum: Object.values(UserRole),
    },

    driverApprovalStatus: {
      type: String,
      enum: Object.values(DriverApprovalStatus),
    },
    isDriverActive: {
      type: Boolean,
    },
    vehicleInfo: vehicleModel
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
