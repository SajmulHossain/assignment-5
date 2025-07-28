import { genSalt, hash } from "bcryptjs"
import { env } from "../config/env.config"

export const encryptPassword = async (password: string): Promise<string> => {
    const saltRound = await genSalt(Number(env.bcrypt_salt_round));
    const hashPassword = await hash(password, saltRound);
    return hashPassword;
}