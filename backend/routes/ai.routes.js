import express from "express";
import { aiHelp } from "../controllers/aiHelp.js";
import { checkAuth } from "../middlewares/auth.middleware.js";


export const aiRouter = express.Router();

aiRouter.post("/help", checkAuth,aiHelp);