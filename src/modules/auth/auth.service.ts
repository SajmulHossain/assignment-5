import { compare } from "bcryptjs";
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

const changePassword = async (
  current_password: string,
  new_password: string,
  id: string
) => {
  const user = await User.findById(id);

  const isCurrentPassMatched = await compare(
    current_password,
    user?.password as string
  );

  if (!isCurrentPassMatched) {
    throw new AppError(401, "Old Password didn't matched");
  }
  
  await User.findByIdAndUpdate(id, {
    password: await encryptPassword(new_password),
  });
};

export const AuthService = {
  register,
  getMe,
  changePassword,
};
