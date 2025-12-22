import React from "react";
import { motion } from "framer-motion";
import { Video, GitBranch, Zap, Target, Layout, Repeat, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE FEATURE CARD (Light Mode Version) ---
const FeatureCard = ({ title, description, icon: Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2 }}
      whileHover={{ y: -5 }}
      className="group relative p-8 rounded-2xl bg-white border border-zinc-200 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 overflow-hidden"
    >
      {/* Hover Gradient Blob (Subtle light mode glow) */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 flex flex-col items-start h-full">
        {/* Icon Container */}
        <div className="mb-6 inline-flex p-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-500 group-hover:text-sky-600 group-hover:bg-sky-50 group-hover:border-sky-100 transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Text */}
        <h3 className="text-xl font-medium text-zinc-900 mb-3 font-poppins">
          {title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed font-inter">
          {description}
        </p>

        {/* 'Explore' arrow that appears on hover */}
        <div className="mt-auto pt-6 flex items-center text-sky-600 text-xs font-bold uppercase tracking-widest opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Learn more <ArrowUpRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. THE MAIN SECTION ---
export function Features() {
  const features = [
    {
      title: "AI Video Explanations",
      desc: "Stop reading paragraphs. Watch the AI break down the logic step-by-step in real-time.",
      icon: Video,
    },
    {
      title: "Multi-Approach Solutions",
      desc: "Don't just learn the optimal solution. Learn the Brute Force, Better, and Optimal paths.",
      icon: GitBranch,
    },
    {
      title: "Algorithm Visualizations",
      desc: "Interactive graphs and trees that show you exactly how data moves through memory.",
      icon: Zap,
    },
    {
      title: "Interview-Focused",
      desc: "Curated sets targeting FAANG patterns. No random math puzzles, just interview core patterns.",
      icon: Target,
    },
    {
      title: "Zero-Distraction UI",
      desc: "A clean, minimalist interface designed for deep work. No ads, no gamification clutter.",
      icon: Layout,
    },
    {
      title: "Spaced Repetition",
      desc: "The platform remembers what you struggled with and brings it back before you forget.",
      icon: Repeat,
    },
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden ">
      {/* Background Grid Texture (Subtle Zinc-200 lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Fade out grid at edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 tracking-tight">
            Everything you need to <br />
            <span className="text-zinc-400 italic">crack the interview.</span>
          </h2>
          <p className="text-md leading-snug text-zinc-500 font-poppins max-w-2xl">
             We stripped away the gamification and badges. This is a toolkit for serious engineers who want to understand the core patterns.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              index={idx}
              title={feature.title}
              description={feature.desc}
              icon={feature.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}