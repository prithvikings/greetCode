import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function FinalCTA() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-zinc-50 flex items-center justify-center min-h-[600px]">
      
      {/* --- BACKGROUND FX --- */}
      
      {/* 1. The Perspective Grid (The "Floor") */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
            style={{ transform: "perspective(1000px) rotateX(60deg) translateY(-100px) scale(1.5)", opacity: 0.4 }}
        />
      </div>

      {/* 2. The Ambient Glow (The "Horizon") */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-200/20 blur-[120px] rounded-full pointer-events-none" />


      {/* --- CONTENT --- */}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Floating Tag */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8"
        >
            <Sparkles className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
            <span className="text-xs font-medium text-zinc-600 font-poppins tracking-wide uppercase">
                Join 10,000+ Engineers
            </span>
        </motion.div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-poppins font-medium text-zinc-900 tracking-tight leading-[1.1] mb-8">
          If You’re Going to Practice, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-600 to-zinc-900">
            At Least Understand It.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-md text-zinc-500 font-poppins max-w-xl mx-auto mb-10 leading-snug">
          Stop memorizing solutions that you'll forget in a week. Build the visual intuition that sticks for your entire career.
        </p>

        {/* The "Shiny" Button */}
        <div className="flex flex-col items-center gap-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full text-lg font-medium shadow-xl shadow-zinc-900/20 overflow-hidden"
            >
                {/* Shimmer Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <span className="relative z-10 font-poppins">Start Solving for Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>

            {/* Trust Trigger */}
            <p className="text-xs text-zinc-400 font-medium flex items-center gap-2">
                <Zap className="w-3 h-3 text-zinc-400" />
                No credit card required
            </p>
        </div>

      </div>
    </section>
  );
}