import AppError from "../../utils/AppError";
import { DriverApprovalStatus, IUser, UserRole } from "./user.interface";
import { User } from "./user.model";

const getAllUser = async() => {
    const users = await User.find();

    return users;
}

const getSingleUser = async (id: string) => {
    const user = await User.findById(id);

    return user;
}

const updateUser = async (email:string, payload: Partial<IUser>) => {
    await User.findOneAndUpdate({email}, payload, {new: true});
}

const driverAccessUpdate = async(id:string, status: DriverApprovalStatus) => {
    const driver = await User.findOne({ _id: id, role: UserRole.driver })

    if(!driver) {
        throw new AppError(404, "Driver not found");
    }

    driver.driverApprovalStatus = status;
    driver.isDriverActive = false;

    await driver.save();
}

const userBlockUpdate = async(id:string) => {
    const user = await User.findById(id);

    if(!user) {
        throw new AppError(404, "User not exist");
    }

    user.isBlocked = !user.isBlocked;

    await user.save();
}

export const UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    driverAccessUpdate,
    userBlockUpdate
}