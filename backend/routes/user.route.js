import express from 'express';
import { registerUser, loginUser, getUserProfile, LogoutUser } from '../controllers/auth.controllers.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
export const userRoutes = express.Router();

// Sample route to get user profile
userRoutes.post("/register",registerUser);
userRoutes.post("/login",loginUser);
userRoutes.get("/profile",checkAuth ,getUserProfile);
userRoutes.post("/logout",LogoutUser);