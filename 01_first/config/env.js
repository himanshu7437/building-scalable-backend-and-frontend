import dotenv from 'dotenv'

dotenv.config();

export const env = {
    port : process.env.PORT || 3000,
    mongoUri : process.env.MONGO_URI,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
    nodeEnv: process.env.NODE_ENV || "development",
    frontendUrl: process.env.FRONTEND_URL
}