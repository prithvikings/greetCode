import express from "express";
import { checkAdmin } from '../middlewares/admin.middleware.js';
import {generateUploadSignature, saveVideoMetadata,deleteVideo} from '../controllers/video.controllers.js';
export const videoRouter = express.Router();

videoRouter.get("/create/:problemId",checkAdmin, generateUploadSignature);
videoRouter.post("/save-metadata",checkAdmin, saveVideoMetadata);
videoRouter.delete("/delete/:problemId",checkAdmin, deleteVideo);
