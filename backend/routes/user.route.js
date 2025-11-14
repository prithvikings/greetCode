import express from 'express';
import { registerUser, loginUser, getUserProfile, LogoutUser,registerAdmin,deleteUser,check } from '../controllers/auth.controllers.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
import {checkAdmin} from "../middlewares/admin.middleware.js";
export const userRoutes = express.Router();

// Sample route to get user profile
userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);
userRoutes.get("/profile",checkAuth ,getUserProfile);
userRoutes.post("/logout",checkAuth,LogoutUser);
userRoutes.post("/deleteProfile",checkAuth,deleteUser);

userRoutes.post("/admin/register",checkAdmin,registerAdmin);


// Route to check authentication status
userRoutes.get("/check",checkAuth,check);