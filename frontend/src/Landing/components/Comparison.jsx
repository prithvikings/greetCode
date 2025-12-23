import React from "react";
import { motion } from "motion/react";
import { X, Check, ArrowRight, Zap, BookOpen, Target, BrainCircuit } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Helper Component: The Animated Strikethrough ---
const StrikethroughText = ({ text }) => {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {/* The Red Line */}
      <motion.span
        className="absolute top-1/2 left-0 h-[2px] bg-red-400 dark:bg-red-500 w-0 z-20 pointer-events-none"
        variants={{
          hover: { width: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
          rest: { width: "0%", transition: { duration: 0.2 } }
        }}
      />
    </span>
  );
};


// --- 1. THE COMPARISON ROW COMPONENT ---
const ComparisonRow = ({ feature, oldWay, newWay, icon: Icon, index }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { backgroundColor: "rgba(0, 0, 0, 0)" },
        hover: { backgroundColor: "rgba(0, 0, 0, 0)" } 
      }}
      className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-6 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 group cursor-default"
    >
      {/* Column 1: Feature Label (3 cols) */}
      <div className="md:col-span-3 flex items-center gap-3">
        <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 border",
            // Light Mode
            "bg-zinc-50 border-zinc-200 text-zinc-400 group-hover:text-sky-600 group-hover:bg-sky-50 group-hover:border-sky-100",
            // Dark Mode
            "dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-500 dark:group-hover:text-sky-400 dark:group-hover:bg-sky-900/20 dark:group-hover:border-sky-800/50"
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400 font-poppins uppercase tracking-wide">
          {feature}
        </span>
      </div>

      {/* Column 2: The Old Way (4 cols) - Muted & Animated Strikethrough */}
      <div className="md:col-span-4 pl-11 md:pl-0 relative">
        <span className="md:hidden text-xs text-zinc-400 dark:text-zinc-600 font-bold uppercase mb-1 block">Most Platforms</span>
        
        <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-400 dark:group-hover:text-zinc-400 transition-colors">
            <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 shrink-0 group-hover:text-red-300 dark:group-hover:text-red-900 transition-colors" />
            <span className="text-base font-inter">
                <StrikethroughText text={oldWay} />
            </span>
        </div>
      </div>

      {/* Column 3: The New Way (5 cols) - Sharp & Elevated */}
      <div className="md:col-span-5 pl-11 md:pl-0 relative">
         <span className="md:hidden text-xs text-sky-600 dark:text-sky-400 font-bold uppercase mb-1 block">Our Platform</span>

         <div className={cn(
            "p-4 -my-4 rounded-xl transition-all duration-300 flex items-center gap-3 border",
            // Base state (Transparent)
            "bg-transparent border-transparent",
            // Hover State Light
            "group-hover:bg-white group-hover:shadow-lg group-hover:shadow-zinc-200/50 group-hover:border-zinc-100",
            // Hover State Dark (Subtle elevation)
            "dark:group-hover:bg-zinc-900 dark:group-hover:shadow-black/50 dark:group-hover:border-zinc-800"
         )}>
            <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-base font-medium text-zinc-900 dark:text-zinc-100 font-poppins">
                {newWay}
            </span>
         </div>
      </div>
    </motion.div>
  );
};

// --- 2. THE MAIN COMPONENT ---
const Comparison = () => {
  const comparisons = [
    {
      feature: "Learning Method",
      icon: BookOpen,
      oldWay: "Reading static text editorials",
      newWay: "Watching visual, animated breakdowns",
    },
    {
      feature: "Problem Set",
      icon: Target,
      oldWay: "Grinding 500+ random questions",
      newWay: "Mastering 150 curated patterns",
    },
    {
      feature: "Feedback Loop",
      icon: Zap,
      oldWay: "Cryptic 'Time Limit Exceeded' errors",
      newWay: "Step-by-step execution visualization",
    },
    {
      feature: "Retention",
      icon: BrainCircuit,
      oldWay: "Forgetting the solution in 3 days",
      newWay: "Spaced repetition & active recall",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 dark:text-zinc-100 tracking-tight">
            Stop grinding. <span className="text-zinc-400 dark:text-zinc-500 italic">Start understanding.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto font-inter">
            The traditional way of learning DSA is broken. We fixed it by focusing on intuition over memorization.
          </p>
        </div>

        {/* The Comparison Grid container */}
        <div className="relative">
          
          {/* Desktop Headers */}
          <div className="hidden md:grid grid-cols-12 gap-8 pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-2">
            <div className="col-span-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-poppins">
              Comparison Dimension
            </div>
            <div className="col-span-4 text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-3 font-poppins">
              Standard LeetCode
            </div>
            <div className="col-span-5 text-xs font-medium text-sky-600 dark:text-sky-400 uppercase tracking-widest pl-4 font-poppins">
              Our Platform
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-1">
            {comparisons.map((item, i) => (
              <ComparisonRow
                key={i}
                index={i}
                feature={item.feature}
                icon={item.icon}
                oldWay={item.oldWay}
                newWay={item.newWay}
              />
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="mt-16 flex justify-center">
             <button className="font-inter flex items-center justify-center rounded px-6 py-2 transition duration-300 bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-md font-medium gap-2 shadow-md active:scale-95 hover:scale-105">
                Join the new era
                <ArrowRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;