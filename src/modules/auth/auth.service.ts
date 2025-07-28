import { encryptPassword } from "../../utils/encryptPassword";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const register = async (payload: IUser) => {
  payload.password = await encryptPassword(payload.password);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = (await User.create(payload)).toObject();

  return { rest };
};
const login = async () => {
  return;
};
const changePassword = async () => {
  return;
};
const resetPassword = async () => {
  return;
};
const forgotPassword = async () => {
  return;
};

export const AuthService = {
  register,
  login,
  changePassword,
  resetPassword,
  forgotPassword,
};
