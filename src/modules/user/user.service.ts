import AppError from "../../utils/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUser = async() => {
    const users = await User.find().select("-password");

    return users;
}

const getSingleUser = async (id: string) => {
    const user = await User.findById(id).select("-password");

    return user;
}

const updateUser = async (email:string, payload: Partial<IUser>) => {
   return await User.findOneAndUpdate({ email }, payload, {new: true}).select("-password");
}

const userBlockUpdate = async(id:string) => {
    const user = await User.findById(id);

    if(!user) {
        throw new AppError(404, "User not exist");
    }

    user.isBlocked = !user.isBlocked;

    await user.save();
    return {
        isBlocked: user.isBlocked
    }
}

export const UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    userBlockUpdate,
}