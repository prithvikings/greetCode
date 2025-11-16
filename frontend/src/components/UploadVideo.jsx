import { useParams } from "react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

/* -------------------------------------------------------
   CONFETTI COMPONENT (inline)
-------------------------------------------------------- */
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 opacity-80 animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 40}px`,
            backgroundColor: [
              "#ff4757",
              "#1e90ff",
              "#2ed573",
              "#ffa502",
              "#3742fa",
            ][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

function AdminUpload() {
  const navigate = useNavigate();
  const { problemId } = useParams();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  const selectedFile = watch("videoFile")?.[0];

  // Redirect after success
  const goHome = () => navigate("/");

  /* -------------------------------------------------------
     Upload Handler
  -------------------------------------------------------- */
  const onSubmit = async (data) => {
    const file = data.videoFile[0];

    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      // STEP 1: Get signature
      const signatureResponse = await axiosClient.get(
        `/api/auth/video/create/${problemId}`
      );

      const { signature, timestamp, publicId, apiKey, upload_url } =
        signatureResponse.data;

      // STEP 2: Cloudinary FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", publicId);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", apiKey);

      // STEP 3: Upload video
      const uploadResponse = await axios.post(upload_url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      const cloudinaryResult = uploadResponse.data;

      // STEP 4: Save metadata
      await axiosClient.post("/api/auth/video/save-metadata", {
        problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      // SUCCESS POPUP
      setUploadedVideo(cloudinaryResult);
      setShowSuccessModal(true);

      // Auto redirect after 3 seconds
      setTimeout(() => goHome(), 3000);

      reset();
    } catch (err) {
      console.error("Upload error:", err);
      setError("root", {
        type: "manual",
        message: err.response?.data?.message || "Upload failed. Try again.",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  /* -------------------------------------------------------
     Utility Functions
  -------------------------------------------------------- */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* -------------------------------------------------------
     UI
  -------------------------------------------------------- */
  return (
    <div className="max-w-md mx-auto p-6">
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 fade-in">

          {/* Confetti */}
          <Confetti />

          <div className="modal-box animate-popup p-8 text-center bg-base-100 shadow-2xl border border-base-300 space-y-4">
            
            {/* CHECK ICON */}
            <div className="flex justify-center">
              <div className="text-green-500 animate-bounce-slow drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold">Upload Complete!</h2>

            <p className="text-gray-600 text-sm">
              Your editorial video has been successfully uploaded 🎉
            </p>

            <button
              className="btn btn-primary mt-3"
              onClick={goHome}
            >
              Go to Home
            </button>
          </div>
        </div>
      )}

      {/* Upload Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Upload Video</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* FILE INPUT */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Choose video file</span>
              </label>
              <input
                type="file"
                accept="video/*"
                {...register("videoFile", {
                  required: "Please select a video file",
                  validate: {
                    isVideo: (files) => {
                      if (!files || !files[0]) return "Please select a video file";
                      return files[0].type.startsWith("video/")
                        ? true
                        : "Please upload a valid video file";
                    },
                    fileSize: (files) => {
                      const file = files?.[0];
                      return file.size <= 100 * 1024 * 1024
                        ? true
                        : "File size must be under 100 MB";
                    },
                  },
                })}
                className={`file-input file-input-bordered w-full ${
                  errors.videoFile ? "file-input-error" : ""
                }`}
                disabled={uploading}
              />
              {errors.videoFile && (
                <label className="label text-error">{errors.videoFile.message}</label>
              )}
            </div>

            {/* FILE INFO */}
            {selectedFile && (
              <div className="alert alert-info">
                <div>
                  <h3 className="font-bold">Selected File:</h3>
                  <p>{selectedFile.name}</p>
                  <p>Size: {formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
            )}

            {/* UPLOAD PROGRESS */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={uploadProgress}
                  max="100"
                ></progress>
              </div>
            )}

            {/* GENERAL ERROR */}
            {errors.root && (
              <div className="alert alert-error">{errors.root.message}</div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="card-actions justify-end">
              <button
                type="submit"
                disabled={uploading}
                className={`btn btn-primary ${uploading ? "loading" : ""}`}
              >
                {uploading ? "Uploading..." : "Upload Video"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;
