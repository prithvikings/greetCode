import { useState, useRef, useEffect } from "react";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
} from "lucide-react";

const Editorial = ({ secureUrl, thumbnailUrl, duration }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  const speeds = [0.5, 1, 1.5, 2];

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const muted = videoRef.current.muted;
    videoRef.current.muted = !muted;
    setVolume(muted ? 1 : 0);
  };

  const toggleFullscreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const update = () => setCurrentTime(vid.currentTime);
    vid.addEventListener("timeupdate", update);

    return () => vid.removeEventListener("timeupdate", update);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
      if (e.code === "ArrowRight") {
        videoRef.current.currentTime += 5;
      }
      if (e.code === "ArrowLeft") {
        videoRef.current.currentTime -= 5;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  if (!secureUrl) {
    return (
      <div className="p-4 text-center text-gray-500 italic">
        📌 No editorial video available.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden bg-black shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setShowSpeedMenu(false);
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={secureUrl}
        poster={thumbnailUrl}
        className="w-full aspect-video"
        onClick={togglePlayPause}
      />

      {/* Big Center Play Button */}
      {!isPlaying && (
        <button
          onClick={togglePlayPause}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-full hover:scale-110 transition">
            <Play size={40} className="text-white" />
          </div>
        </button>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-all ${
          isHovering || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">

          {/* Play / Pause */}
          <button className="btn btn-circle btn-sm" onClick={togglePlayPause}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          {/* Mute */}
          <button className="btn btn-circle btn-sm" onClick={toggleMute}>
            {volume === 0 ? <VolumeX /> : <Volume2 />}
          </button>

          {/* Time */}
          <span className="text-white text-sm">{formatTime(currentTime)}</span>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
              videoRef.current.currentTime = Number(e.target.value);
            }}
            className="range range-primary flex-1"
          />

          <span className="text-white text-sm">{formatTime(duration)}</span>

          {/* Playback Speed */}
          <div className="relative">
            <button
              className="btn btn-circle btn-sm"
              onClick={() => setShowSpeedMenu((v) => !v)}
            >
              <Settings />
            </button>

            {showSpeedMenu && (
              <div className="absolute bottom-12 right-0 bg-black/80 text-white p-2 rounded-lg shadow-lg w-24">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      videoRef.current.playbackRate = s;
                      setShowSpeedMenu(false);
                    }}
                    className="w-full text-sm hover:bg-white/10 p-1 rounded"
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <button className="btn btn-circle btn-sm" onClick={toggleFullscreen}>
            <Maximize />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editorial;
