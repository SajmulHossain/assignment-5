import { env } from "../config/env.config";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createToken = (user: Partial<IUser>) => {
      const jwtPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const accessToken = generateToken(jwtPayload, env.jwt.jwt_access_secret, env.jwt.jwt_access_exp);
      const refreshToken = generateToken(jwtPayload, env.jwt.jwt_refresh_secret, env.jwt.jwt_refresh_exp);

      return {
        accessToken, refreshToken
      }
}