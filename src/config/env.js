import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
    NODE_ENV: process.env.NODE_ENV || "development",
};

export default env;