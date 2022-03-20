import dotenv from "dotenv";

dotenv.config();

const config = {
  generalErrorMessage: "Something went wrong.",
  nodeEnv: process.env.NODE_ENV,
  secret: process.env.API_SECRET,
  port: process.env.PORT || process.env.NODE_ENV === "test" ? 3001 : 3000,
  dbConnection:
    process.env.NODE_ENV === "production"
      ? process.env.DB_REMOTE_URL
      : process.env.DB_LOCAL_URL,
};

export default config;
