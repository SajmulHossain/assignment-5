import { model, Schema } from "mongoose";
import { DriverApprovalStatus, IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      // required: [true, "Name is required"],
      required:true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      // unique: [true,"Email Already Exist"],
      unique: true
    },
    phone:{ type: String, required: true },
    password: { type: String, required: true },
    isBlocked: Boolean,

    role: {
      type: String,
      enum: Object.values(UserRole)
    },
    
    driverApprovalStatus: {
      type: String,
      enum: Object.values(DriverApprovalStatus),
      default: DriverApprovalStatus.pending
    },
    isDriverActive: {
      type: Boolean,
      default: false,
    }
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("User", userSchema);
