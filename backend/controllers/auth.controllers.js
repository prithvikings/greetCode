import { validateRegistrationData } from "../utils/validator.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/token.js";
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";
import { redisClient } from "../config/redis.js";
import { Submission } from "../models/submission.models.js";

// User Registration ✅
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    validateRegistrationData({ name, email, password });

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname: name,
      lastname:"",
      email,
      password: hashpassword,
      role: "user", // FORCE role
    });

    await newUser.save(); // IMPORTANT
    const token = jwt.sign(
      { _id: newUser._id, emailId: email, role: "user" },
      ENV.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        firstname: newUser.firstname,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// User Login ✅
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, emailId: email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const frontendResponseUser = {
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      role: user.role, 
    };

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production" ? true : false, // false for localhost
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged in successfully",
      user: frontendResponseUser,
    });
  } catch (error) {

    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};

// Get User Profile ✅
export const getUserProfile = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// User Logout ✅
export const LogoutUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.decode(token);
    const expiry = payload.exp;
    if (token) {
      await redisClient.set(`token:${token}`, "Blocked");
      await redisClient.expireAt(`token:${token}`, expiry);

      res.clearCookie("token", {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production" ? true : false,
        sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      });

      res.status(200).json({ message: "Logout successful" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
  }
};

// Admin Registration ✅
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing admin
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    validateRegistrationData({ name, email, password });

    const hashpassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      firstname: name,
      lastname: "",
      email,
      password: hashpassword,
      role: "admin",
    });

    await newAdmin.save();

    const token = jwt.sign(
      { _id: newAdmin._id, emailId: email, role: "admin" },
      ENV.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        _id: newAdmin._id,
        firstname: newAdmin.firstname,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Error registering admin",
      error: error.message,
    });
  }
};

// Delete User ✅
export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Submission.deleteMany({ userId: userId });

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

// Check Authentication ✅
export const check = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    const frontendResponseUser = {
      _id: user._id,
      firstname: user.firstname,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "User is authenticated",
      user: frontendResponseUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking authentication",
      error: error.message,
    });
  }
};
