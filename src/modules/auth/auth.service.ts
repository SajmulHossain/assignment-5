import AppError from "../../utils/AppError";
import { encryptPassword } from "../../utils/encryptPassword";
import { DriverApprovalStatus, IUser, UserRole } from "../user/user.interface";
import { User } from "../user/user.model";

const getMe = async (id: string) => {
  const data = (await User.findById(id))?.toObject();
  if (!data) {
    throw new AppError(404, "User not found");
  }
  data.password = undefined;
  return data;
};

const register = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new AppError(400, "User already exist");
  }

  if (payload.role === UserRole.driver) {
    payload.driverApprovalStatus = DriverApprovalStatus.pending;
    payload.isDriverActive = false;
    if (!payload.vehicleInfo) {
      throw new AppError(400, "Please provide your vehicle info");
    }
  } else {
    payload.isBlocked = false;
  }

  payload.password = await encryptPassword(payload.password as string);

  const data = (await User.create(payload)).toObject();
  data.password = undefined;

  return data;
};

export const AuthService = {
  register,
  getMe,
};
