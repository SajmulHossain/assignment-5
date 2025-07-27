import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const register = async (payload: IUser) => {
  const user = await User.create(payload)
  
  return user;
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
