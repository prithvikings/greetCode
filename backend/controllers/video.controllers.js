import { User } from "../models/user.models.js";
import { Problem } from '../models/problems.models.js';
import { Video } from '../models/video.models.js';
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateUploadSignature = async (req, res) => {
  try {

    const { problemId } = req.params;
    const userId = req.userId;


    // verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // generate unique public_id for the video
    const timeStamp = Math.round(new Date().getTime() / 1000); // Current timestamp in seconds
    const publicId = `greetcode-solutions/${problemId}/${userId}_${timeStamp}`;

    // upload Parameters
    const uploadParams = {
      timestamp: timeStamp,
    public_id: publicId

    };


    // generate signature
    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature: signature,
      timestamp: timeStamp,
      publicId: publicId,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    });
  } catch (error) {
    console.error("Error generating upload signature:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const saveVideoMetadata = async (req, res) => {
  try {
    const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;

    const userId = req.userId;

    // verify the upload with cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      cloudinaryPublicId,
      {
        resource_type: "video",
      }
    );

    if (!cloudinaryResource) {
      return res.status(404).json({ message: "Video not found in Cloudinary" });
    }

    // check if the video already exists in the database
    const existingVideo = await Video.findOne({
      problemId,
      userId,
      cloudinaryPublicId,
    });
    if (existingVideo) {
      return res.status(400).json({ message: "Video metadata already exists" });
    }

    //thumbnail generation
    // const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
    //   resource_type: "video",
    //   format: "jpg",
    //   transformation: [
    //     { width: 400, height: 225, crop: "fill" },
    //     { start_offset: "auto" },
    //     { quality: "auto" },
    //   ],
    // });
const thumbnailUrl =
  `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload/${cloudinaryPublicId}.jpg`;


const newVideo = await Video.create({
  problemId,
  userId,
  cloudinaryPublicId,
  secureUrl,
  duration: cloudinaryResource.duration || duration,
  thumbnailUrl,  // <- correct URL
});

    res.status(201).json({
      message: "Video metadata saved successfully",
      video: {
        id: newVideo._id,
        thumbnailUrl: newVideo.thumbnailUrl,
        duration: newVideo.duration,
        uploadAt: newVideo.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving video metadata:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.userId;

    const video = await Video.findOneAndDelete({ problemId, userId });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
      resource_type: "video",
      invalidate: true,
    });
    await Video.findByIdAndDelete(video._id);

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
