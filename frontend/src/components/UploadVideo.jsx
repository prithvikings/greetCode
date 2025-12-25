import { useParams } from "react-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { 
  UploadCloud, 
  FileVideo, 
  XCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Loader2,
  Film
} from "lucide-react";

/* -------------------------------------------------------
   CONFETTI COMPONENT (Logic Unchanged)
-------------------------------------------------------- */
const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
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
      Upload Handler (Logic Unchanged)
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
      Utility Functions (Logic Unchanged)
   -------------------------------------------------------- */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Note: formatDuration was defined in your original code but not used in the render. 
  // I kept it here to ensure no logic is removed.
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* -------------------------------------------------------
      UI
   -------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 font-sans selection:bg-blue-500/30">
      
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          
          {/* Confetti */}
          <Confetti />

          <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
            
            {/* CHECK ICON */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Upload Complete!</h2>

            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              Your video solution has been successfully uploaded and linked to the problem.
            </p>

            <button
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-900/20"
              onClick={goHome}
            >
              Return to Dashboard
            </button>
            <p className="text-xs text-zinc-600 mt-4">Redirecting automatically in 3s...</p>
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="w-full max-w-lg">
        
        {/* Header / Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium group"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </button>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
            
            {/* Card Title */}
            <div className="p-8 pb-0">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <UploadCloud className="w-6 h-6 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Upload Video</h1>
                </div>
                <p className="text-zinc-400 text-sm ml-1">Select a video file to explain the solution.</p>
            </div>

            <div className="p-8 pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* FILE INPUT AREA */}
                    <div className="form-control w-full">
                        <label className={`
                            relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
                            ${errors.videoFile 
                                ? "border-rose-500/50 bg-rose-500/5 hover:bg-rose-500/10" 
                                : "border-zinc-700 bg-zinc-950/50 hover:border-blue-500/50 hover:bg-zinc-900"
                            }
                        `}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                <UploadCloud className={`w-8 h-8 mb-3 ${errors.videoFile ? "text-rose-500" : "text-zinc-500"}`} />
                                <p className="mb-1 text-sm text-zinc-300 font-medium">
                                    <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">MP4, WebM or Ogg (Max 100MB)</p>
                            </div>
                            
                            <input
                                type="file"
                                accept="video/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
                                disabled={uploading}
                            />
                        </label>
                        {errors.videoFile && (
                            <div className="flex items-center gap-2 mt-2 text-rose-500 text-xs pl-1">
                                <XCircle className="w-3 h-3" />
                                <span>{errors.videoFile.message}</span>
                            </div>
                        )}
                    </div>

                    {/* SELECTED FILE INFO */}
                    {selectedFile && !errors.videoFile && (
                        <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <div className="p-2 bg-blue-500/20 rounded text-blue-400">
                                <FileVideo className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-blue-100 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-blue-400/70">{formatFileSize(selectedFile.size)}</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        </div>
                    )}

                    {/* UPLOAD PROGRESS */}
                    {uploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-zinc-400">
                                <span>Uploading to Server...</span>
                                <span className="text-blue-400">{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* GENERAL ERROR */}
                    {errors.root && (
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-3 text-rose-500 text-sm">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            {errors.root.message}
                        </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`
                            w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all
                            ${uploading 
                                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700" 
                                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 hover:scale-[1.02]"
                            }
                        `}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                            </>
                        ) : (
                            <>
                                <Film className="w-4 h-4" /> Start Upload
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;