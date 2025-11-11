import { validateRegistrationData } from "../utils/validator.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import {generateToken} from "../config/token.js"
import { ENV } from "../config/env.js";
export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;

  try {
    // Check for existing user
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    validateRegistrationData(firstname, lastname, email, password, role);

    //hash password
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = User({
      firstname,
      lastname,
      email,
      password: hashpassword,
      role,
    });
    newUser.save();

    // jwt token generation can be added here
    const token = generateToken(newUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production" ? true : false, // false for localhost
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      token, // optional – remove if you only want to rely on cookies
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: "Email and password are required"});
  }

  const user= await User.findOne({email});
  if(!user){
    return res.status(400).json({message: "Invalid email or password"});
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    return res.status(400).json({message: "Invalid email or password"});
  }

  // Generate JWT token
  const token = generateToken(user._id);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production" ? true : false, // false for localhost
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax", // ✅ allow cross-site cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "User logged in successfully",
    user,
  });
  }catch(error){
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }

};

export const getUserProfile = async (req, res) => {
   try {
    const id=req.userId;
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


export const LogoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production" ? true : false,
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
};
