import { User } from "./user.model";

const getAllUser = async() => {
    const users = await User.find();

    return users;
}

const getSingleUser = async (id: string) => {
    const user = await User.findById(id);

    return user;
}

export const UserService = {
    getAllUser,
    getSingleUser
}