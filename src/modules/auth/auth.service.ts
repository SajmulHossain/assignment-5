import AppError from "../../utils/AppError";
import { encryptPassword } from "../../utils/encryptPassword";
import { DriverApprovalStatus, IUser, UserRole } from "../user/user.interface";
import { User } from "../user/user.model";

const register = async (payload: IUser) => {
  const isUserExist = await User.findOne({ email: payload.email });

  if (isUserExist) {
    throw new AppError(400, "User already exist");
  }

  if (payload.role === UserRole.driver) {
    payload.driverApprovalStatus = DriverApprovalStatus.pending;
    payload.isDriverActive = false;
    if(!payload.vehicleInfo) {
      throw new AppError(400, "Please provide your vehicle info");
    }
  } else {
    payload.isBlocked = false;
  }

  payload.password = await encryptPassword(payload.password);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = (await User.create(payload)).toObject();

  return rest;
};

export const AuthService = {
  register,
};
