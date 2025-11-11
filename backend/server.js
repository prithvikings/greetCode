import app from "./app.js";
import {connectDB} from "./config/db.js";
import { ENV } from "./config/env.js";
import { connectRedis } from "./config/redis.js";

const PORT = ENV.PORT || 5000;

const startServer =async()=>{
    try{
        await Promise.all([
            connectDB(),
            connectRedis()
        ])
        console.log("All services connected successfully");
        app.listen(PORT,()=>{
            console.log(`Server is running in ${ENV.NODE_ENV} mode on port ${PORT}`);
        });
    }
    catch(error){
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();