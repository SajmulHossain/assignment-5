import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  MONGODB_URI: string;
  PORT: string;
}



const loadEnvVars = (): EnvConfig => {
  const requiredVars: string[] = ["MONGODB_URI", "PORT"];

  requiredVars.forEach((val) => {
    if (!process.env[val]) {
      throw new Error(`${val} variable is not available in env`);
    }
  });

  return {
    MONGODB_URI: process.env.MONGODB_URI as string,
    PORT: process.env.PORT as string,
  };
};

export const env = loadEnvVars();
