import dotenv from 'dotenv';
dotenv.config();

export const ENV={
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI|| 'mongodb://localhost:27017/myapp',
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
}