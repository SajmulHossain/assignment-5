import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  mongodb_uri: string;
  port: string;
  jwt: { jwt_access_secret: string; jwt_access_exp: string };
}

const loadEnvVars = (): EnvConfig => {
  const requiredVars: string[] = [
    "MONGODB_URI",
    "PORT",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXP",
  ];

  requiredVars.forEach((val) => {
    if (!process.env[val]) {
      throw new Error(`${val} variable is not available in env`);
    }
  });

  return {
    mongodb_uri: process.env.MONGODB_URI as string,
    port: process.env.PORT as string,
    jwt: {
      jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
      jwt_access_exp: process.env.JWT_ACCESS_EXP as string,
    },
  };
};

export const env = loadEnvVars();
