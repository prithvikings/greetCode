import React from "react";
import { motion } from "motion/react";
import { Search, Terminal, PlayCircle, Trophy, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE MINI-VISUALS (Complex Animated Icons) ---

// Step 1: "Search/Pick"
const SearchVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* DARK MODE: bg-zinc-100 -> dark:bg-zinc-800, border-zinc-200 -> dark:border-zinc-700 */}
    <div className="w-16 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-md flex flex-col gap-2 p-2 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        {/* DARK MODE: Internal bars darkened */}
        <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        <div className="w-3/4 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        <div className="w-1/2 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
        
        {/* Scanning Highlight */}
        <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 right-0 h-4 bg-sky-500/10 dark:bg-sky-500/20 blur-sm top-0"
        />
    </div>
    <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        // DARK MODE: Icon bubble bg-white -> dark:bg-zinc-900, border-zinc-100 -> dark:border-zinc-700
        className="absolute -right-2 -bottom-2 bg-white dark:bg-zinc-900 p-1.5 rounded-full shadow-md border border-zinc-100 dark:border-zinc-700 text-sky-500"
    >
        <Search className="w-4 h-4" />
    </motion.div>
  </div>
);

// Step 2: "Try Solving"
const CodeVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* DARK MODE: Terminal bg is already dark, but we darken border to blend better */}
    <div className="w-20 h-14 bg-zinc-900 dark:bg-black rounded-md border border-zinc-700 dark:border-zinc-800 p-2 flex flex-col gap-1.5 shadow-lg">
        <div className="flex gap-1 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
        </div>
        <div className="flex gap-1 items-center">
            <span className="text-[6px] text-green-400 font-mono">{'>'}</span>
            <motion.div 
                animate={{ width: ["0%", "80%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                className="h-1 bg-zinc-500 rounded-full overflow-hidden" 
            />
        </div>
         <div className="flex gap-1 items-center">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, delay: 1 }}
                className="w-full h-1 bg-zinc-600 rounded-full" 
            />
        </div>
    </div>
  </div>
);

// Step 3: "Watch AI"
const VideoVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Ripples */}
    {[0, 1].map(i => (
        <motion.div 
            key={i}
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
            className="absolute w-10 h-10 rounded-full border border-sky-500/30"
        />
    ))}
    {/* DARK MODE: Center button white -> zinc-900, border-zinc-100 -> border-zinc-700 */}
    <div className="relative z-10 w-12 h-12 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-md border border-zinc-100 dark:border-zinc-700">
        <PlayCircle className="w-6 h-6 text-sky-600 fill-sky-50 dark:fill-sky-900/20" />
    </div>
  </div>
);

// Step 4: "Success"
const SuccessVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <motion.div
        animate={{ y: [10, 0, 10] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
        <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-sm" />
    </motion.div>
    
    {/* Confetti particles */}
    {[...Array(6)].map((_, i) => (
        <motion.div 
            key={i}
            animate={{ y: [0, -20], opacity: [1, 0], x: (i % 2 === 0 ? 10 : -10) }}
            transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
            className={`absolute top-1/2 left-1/2 w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-red-400' : 'bg-blue-400'}`}
        />
    ))}
  </div>
);


// --- 2. THE CARD COMPONENT ---

const StepCard = ({ number, title, text, visual, isLast }) => {
    return (
        <div className="relative flex flex-col items-center text-center group">
            
            {/* The Visual Bubble */}
            <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                className={cn(
                    "w-24 h-24 rounded-2xl border shadow-sm flex items-center justify-center mb-6 relative z-10 transition-all duration-300",
                    // DARK MODE: Main Bubble Colors
                    "bg-white border-zinc-200 group-hover:border-sky-100 group-hover:shadow-xl",
                    "dark:bg-zinc-900 dark:border-zinc-800 dark:group-hover:border-sky-900/50 dark:group-hover:shadow-sky-900/20"
                )}
            >
                {/* DARK MODE: Badge Logic 
                    1. Invert colors: Black bg/White text -> White bg/Black text (dark:bg-zinc-100 dark:text-zinc-900)
                    2. Fix Border: The border creates the 'cutout' effect. It must match the card background (white vs zinc-900).
                */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-mono border-4 bg-zinc-900 text-white border-white dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-900">
                    {number}
                </div>
                <div className="w-full h-full p-2">
                    {visual}
                </div>
            </motion.div>

            {/* Content */}
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 font-poppins mb-2">{title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-inter leading-snug max-w-[200px]">{text}</p>
            
            {/* Mobile Connector Arrow */}
            {!isLast && (
                <div className="md:hidden mt-6 text-zinc-300 dark:text-zinc-700">
                    <ArrowRight className="w-6 h-6 mx-auto rotate-90" />
                </div>
            )}
        </div>
    )
}

// --- 3. THE MAIN COMPONENT ---

export function HowItWorks() {
  const steps = [
    {
        num: "01",
        title: "Pick a Problem",
        text: "Choose from our curated list of patterns, not random questions.",
        visual: <SearchVisual />
    },
    {
        num: "02",
        title: "Attempt Sol.",
        text: "Try to solve it in our editor. Struggle a bit. It is part of the process.",
        visual: <CodeVisual />
    },
    {
        num: "03",
        title: "Watch AI Logic",
        text: "Stuck? Watch the AI visualize the intuition behind the solution.",
        visual: <VideoVisual />
    },
    {
        num: "04",
        title: "Re-Solve",
        text: "Implement the solution yourself to lock in the knowledge.",
        visual: <SuccessVisual />
    }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-2">
            <h2 className="text-4xl font-poppins font-medium text-zinc-900 dark:text-zinc-50">
                How It Works
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-snug font-inter">
                A structured approach to mastering Data Structures and Algorithms without the burnout.
            </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            
            {/* The "Connector Beam" (Desktop Only) */}
            {/* DARK MODE: bg-zinc-100 -> dark:bg-zinc-800. Gradient adjusted for subtle glow on dark. */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-zinc-100 dark:bg-zinc-800 -z-0">
                <motion.div 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-zinc-100 via-sky-200 to-zinc-100 dark:from-zinc-800 dark:via-sky-700 dark:to-zinc-800"
                />
            </div>

            {steps.map((step, i) => (
                <StepCard 
                    key={step.num}
                    number={step.num}
                    title={step.title}
                    text={step.text}
                    visual={step.visual}
                    isLast={i === steps.length - 1}
                />
            ))}
        </div>
      </div>
    </section>
  );
}