import React from "react";
import { motion } from "motion/react";
import { Play, Pause, Maximize2, Settings, Volume2, CheckCircle2 } from "lucide-react";

// --- 1. THE "VIDEO PLAYER" COMPONENT (The Star of the Show) ---
const VideoPlayerMock = () => {
  return (
    <div className="relative w-full aspect-video bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden group">
      {/* Background Gradient / Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-900 to-sky-900/20" />

      {/* The "Content" - Simulated Code Explainer */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center">
        <div className="space-y-3 opacity-80">
          {/* Simulated Code Lines being highlighted */}
          <CodeLine highlight={false} width="60%" />
          <CodeLine highlight={true} width="80%" delay={0} /> {/* Active Line */}
          <CodeLine highlight={false} width="70%" />
          <CodeLine highlight={false} width="50%" />
        </div>
      </div>

      {/* The "AI Avatar" Bubble */}
      <motion.div 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        className="absolute top-4 right-4 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center border-2 border-zinc-800 shadow-lg z-20"
      >
         {/* Simple Waveform animation inside avatar */}
         <div className="flex gap-1 items-end h-4">
            <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
            <motion.div animate={{ height: [6, 16, 6] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-white rounded-full" />
            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-white rounded-full" />
         </div>
      </motion.div>

      {/* Floating "Concept" Tag */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 bg-zinc-800/90 backdrop-blur text-xs text-zinc-300 px-3 py-1 rounded-full border border-zinc-700"
      >
        Dynamic Programming • Memoization
      </motion.div>

      {/* Video Controls (The UI layer) */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end px-4 py-3">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-zinc-700 rounded-full mb-3 overflow-hidden">
            <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "45%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="h-full bg-sky-500" 
            />
        </div>
        
        {/* Buttons Row */}
        <div className="flex items-center justify-between text-zinc-300">
            <div className="flex items-center gap-4">
                <Play className="w-4 h-4 fill-current" />
                <Volume2 className="w-4 h-4" />
                <span className="text-xs font-mono text-zinc-400">04:20 / 12:00</span>
            </div>
            <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <Maximize2 className="w-4 h-4" />
            </div>
        </div>
      </div>

      {/* Big Play Button Overlay (Fade out on hover) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none">
         <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-110 transition-transform"
         >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
         </motion.div>
      </div>
    </div>
  );
};

// Helper for code lines
const CodeLine = ({ highlight, width, delay }) => (
    <div className={`h-3 rounded-full ${highlight ? "bg-sky-500/50" : "bg-zinc-800"}`} style={{ width }}>
        {highlight && (
            <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: delay, repeat: Infinity, repeatDelay: 2 }}
                className="h-full bg-sky-400 rounded-full opacity-50"
            />
        )}
    </div>
);

// --- 2. THE MAIN SECTION ---
export function Solution() {
  const features = [
    "Intuition before implementation",
    "Visual explanation of the algorithm",
    "Line-by-line code walkthrough",
    "Clear time & space complexity",
  ];

  return (
    <section className="relative py-24 px-6 bg-zinc-50 dark:bg-zinc-900 ">
       {/* Top Hatch Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 border-b border-zinc-200 dark:border-zinc-800 flex bg-zinc-50 dark:bg-zinc-950">
        <div
          className="w-full h-full block dark:hidden opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
        <div
          className="w-full h-full hidden dark:block opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
      </div>


      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Text & Features */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-poppins text-zinc-900 dark:text-zinc-200 leading-tight">
              Every Problem Comes With <br />
              <span className="text-sky-600">An AI Video Tutor.</span>
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 font-spacegrotesk leading-snug">
              Stuck? Don't just read code. Watch a short, focused video that breaks down the logic visually before diving into the syntax.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className="h-6 w-6 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-600 transition-colors duration-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-zinc-700 dark:text-zinc-500 font-medium font-poppins">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
             <button className="px-6 py-2 bg-zinc-900  text-white hover:bg-zinc-800 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-400 rounded-lg font-medium font-spacegrotesk  transition shadow-lg shadow-zinc-500/20 flex items-center gap-2 cursor-pointer">
                <Play className="w-4 h-4 " />
                Watch Demo
             </button>
          </div>
        </div>

        {/* Right Column: The Visual */}
        <div className="relative">
            {/* Decorative blob behind */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
            <VideoPlayerMock />
        </div>

      </div>
    </section>
  );
}