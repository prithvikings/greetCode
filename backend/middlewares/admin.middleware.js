import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { redisClient } from "../config/redis.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlock = await redisClient.exists(`token:${token}`);
    if (isBlock) {
      return res
        .status(401)
        .json({ message: "Token is blocked. Please login again." });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded?._id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      throw new Error("Invalid token");
    }

    req.userId = decoded._id;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: error.message });
  }
};
