import { redisClient } from "../config/redis";

export const submitcodeRateLimiter=async (req,res,next)=>{
    try{
        const userId=req.userId;
        const redisKey=`submit_cooldown:${userId}`;

        const exist=await redisClient.exists(redisKey);
        if(exist){
            return res.status(429).json({message:"Too many requests. Please wait before submitting again."});
        }
        await redisClient.set(redisKey,'cooldown_active',{
            EX:60 ,// Key expires in 60 seconds
            NX:true // Only set the key if it does not already exist
        }); 

        next();
    }catch(err){
        console.error("Error in rate limiter middleware:",err);
        res.status(500).json({message:"Internal server error"});
    }
};