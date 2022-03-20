import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV,
  dbConnection:
    process.env.NODE_ENV === "production"
      ? process.env.DB_REMOTE_URL
      : process.env.DB_LOCAL_URL,
};

export default config;
