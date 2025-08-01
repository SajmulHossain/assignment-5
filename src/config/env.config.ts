import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  mongodb_uri: string;
  port: string;
  node_env: "development" | "production";
  express_session_secret: string;
  bcrypt_salt_round: string;
  jwt: {
    jwt_access_secret: string;
    jwt_access_exp: string;
    jwt_refresh_secret: string;
    jwt_refresh_exp: string;
  };
}

const loadEnvVars = (): EnvConfig => {
  const requiredVars: string[] = [
    "MONGODB_URI",
    "PORT",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXP",
    "BCRYPT_SALT_ROUND",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXP",
    "EXPRESS_SESSION_SECRET",
  ];

  requiredVars.forEach((val) => {
    if (!process.env[val]) {
      throw new Error(`${val} variable is not available in env`);
    }
  });

  return {
    mongodb_uri: process.env.MONGODB_URI as string,
    port: process.env.PORT as string,
    node_env: process.env.NODE_ENV as "development" | "production",
    express_session_secret: process.env.EXPRESS_SESSION_SECRET as string,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND as string,
    jwt: {
      jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
      jwt_access_exp: process.env.JWT_ACCESS_EXP as string,
      jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
      jwt_refresh_exp: process.env.JWT_REFRESH_EXP as string,
    },
  };
};

export const env = loadEnvVars();
