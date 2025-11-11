import dotenv from 'dotenv';
dotenv.config();

export const ENV={
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI|| 'mongodb://localhost:27017/myapp',
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    REDIS_USERNAME:process.env.REDIS_USERNAME ,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    NODE_ENV: process.env.NODE_ENV || 'development',
}