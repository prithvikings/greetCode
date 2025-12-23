import React from "react";
import { motion } from "motion/react";
import { X, Check, Terminal, MessageSquare, AlertCircle, Clock, Zap, Search } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE LAYOUT COMPONENTS ---

const BentoGrid = ({ className, children }) => (
  <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
    {children}
  </div>
);

const BentoGridItem = ({ className, title, description, header, icon }) => (
  <motion.div
    className={cn(
      // DARK MODE FIX: Added dark:bg-zinc-900, dark:border-zinc-800, dark:shadow-none
      "row-span-1 rounded-xl group/bento hover:shadow-md transition duration-200 shadow-input dark:shadow-none p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 justify-between flex flex-col space-y-4 overflow-hidden relative",
      className
    )}
  >
    {header}
    <div className="group-hover transition duration-200 relative z-10">
      {icon}
      {/* DARK MODE FIX: Text colors adapted for contrast */}
      <div className="text-zinc-800 dark:text-zinc-100 mb-2 mt-2 text-lg font-poppins font-medium">{title}</div>
      <div className="font-normal text-zinc-500 dark:text-zinc-400 text-sm font-inter max-w-md">{description}</div>
    </div>
  </motion.div>
);

// --- 2. THE "ALL IN" VISUALS ---

// VISUAL 1: The "Compiler Crash" Narrative
// This was already dark, but we ensure it sits correctly in the container.
const ConfusingCodeSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[8rem] rounded-lg bg-zinc-950 border border-zinc-800 relative overflow-hidden font-mono text-[10px] p-3">
      {/* Editor UI */}
      <div className="flex items-center justify-between mb-3 opacity-50">
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="text-zinc-600">brute_force.cpp</div>
      </div>

      {/* Code Text */}
      <div className="space-y-1.5 relative z-10">
        <CodeLine delay={0} text={<><span className="text-purple-400">while</span>(true) {'{'}</>} />
        <CodeLine delay={0.5} text={<span className="pl-4 text-zinc-300">check_permutations();</span>} />
        <CodeLine delay={1.0} text={<span className="pl-4 text-zinc-300">recurse_forever();</span>} />
        <CodeLine delay={1.5} text={<span className="pl-4 text-zinc-500">// Oh no...</span>} />
        <CodeLine delay={1.8} text={<span className="text-zinc-400">{'}'}</span>} />
      </div>

      {/* The "Compiler Scanner" Beam */}
      <motion.div
        initial={{ top: 0, opacity: 0 }}
        animate={{ top: "100%", opacity: [0, 1, 0] }}
        transition={{ duration: 2, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
        className="absolute left-0 right-0 h-[2px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-20 pointer-events-none"
      />

      {/* The Crash Popup */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, type: "spring", bounce: 0.5 }}
        className="absolute inset-0 flex items-center justify-center bg-zinc-950/90 backdrop-blur-[1px] z-30"
      >
        <motion.div 
            animate={{ x: [-2, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
            className="bg-zinc-900 border border-red-500/40 rounded-lg p-4 shadow-2xl flex flex-col items-center gap-3 w-3/4"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-lg rounded-full animate-pulse" />
                <AlertCircle className="w-6 h-6 text-red-500 relative z-10" />
            </div>
            <div className="text-center">
                <div className="text-red-400 font-bold text-xs tracking-wider mb-1">TIME LIMIT EXCEEDED</div>
                <div className="text-[9px] text-zinc-500 font-mono bg-zinc-950 px-2 py-1 rounded">
                    Test Case 92/100 Failed
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const CodeLine = ({ text, delay }) => (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.3 }}>
        {text}
    </motion.div>
);


// VISUAL 2: The "Toxic Stream"
// DARK MODE FIX: Changed gradients to dark zinc, adjusted bubble colors for dark mode visibility.
const FrustrationListSkeleton = () => {
    return (
        <div className="flex flex-col w-full h-full min-h-[8rem] relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border dark:border-zinc-800 rounded-lg">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            
            {/* The Chat Container */}
            <div className="flex flex-col gap-2.5 p-3 absolute bottom-0 w-full">
                 <ChatBubble 
                    u="User12" 
                    text="This is trivial. Use a Segment Tree." 
                    color="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
                    delay={0}
                 />
                 <ChatBubble 
                    u="LeetGod" 
                    text="Why can't you solve this? Easy." 
                    color="bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                    delay={1.5}
                 />
                 <ChatBubble 
                    u="Anon" 
                    text="Just memorize the pattern lol." 
                    color="bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    delay={3}
                 />
                 
                 {/* Typing Indicator */}
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }}
                    className="flex items-center gap-2 pl-1"
                 >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map(i => (
                            <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }} className="w-1 h-1 bg-zinc-400 rounded-full" />
                        ))}
                      </div>
                      <span className="text-[9px] text-zinc-400">typing...</span>
                 </motion.div>
            </div>
            
            {/* Gradient Mask for fading out top comments - ADAPTED FOR DARK MODE */}
            <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white to-transparent dark:from-zinc-900 pointer-events-none" />
        </div>
    );
};

const ChatBubble = ({ u, text, color, delay }) => (
    <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
            "flex items-center gap-3 p-2 rounded-lg border border-zinc-100 shadow-sm relative overflow-hidden group",
            "bg-white dark:bg-zinc-950 dark:border-zinc-800" // Base bubble style
        )}
    >
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0", color)}>
            {u[0]}
        </div>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-300 font-medium font-inter leading-tight">{text}</p>
        
        {/* Shimmer effect */}
        <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ delay: delay + 0.5, duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 dark:via-white/10"
        />
    </motion.div>
);


// VISUAL 3: The "Data Flow" Tree
// DARK MODE FIX: Changed background to match the grid structure.
const VisualSolutionSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[8rem] bg-zinc-900 dark:bg-zinc-950 rounded-lg relative overflow-hidden group border dark:border-zinc-800">
      
      {/* Dynamic Grid Background - Adjusted opacity for dark mode */}
      <motion.div 
         animate={{ backgroundPosition: ["0px 0px", "20px 20px"] }}
         transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
         className="absolute inset-0 opacity-20"
         style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <div className="flex items-center justify-center h-full relative z-10 p-4">
        <svg viewBox="0 0 140 80" className="w-full h-full drop-shadow-2xl">
            {/* Connections */}
            <Connection start={[70, 10]} end={[40, 40]} delay={0.5} />
            <Connection start={[70, 10]} end={[100, 40]} delay={0.5} />
            <Connection start={[40, 40]} end={[20, 70]} delay={1.5} />
            <Connection start={[40, 40]} end={[60, 70]} delay={1.8} />
            <Connection start={[100, 40]} end={[90, 70]} delay={1.5} />
            <Connection start={[100, 40]} end={[120, 70]} delay={1.8} />

            {/* Nodes */}
            <Node cx={70} cy={10} delay={0} isRoot />
            
            <Node cx={40} cy={40} delay={1.2} />
            <Node cx={100} cy={40} delay={1.2} />
            
            <Node cx={20} cy={70} delay={2.2} isLeaf />
            <Node cx={60} cy={70} delay={2.5} isLeaf />
            <Node cx={90} cy={70} delay={2.2} isLeaf />
            <Node cx={120} cy={70} delay={2.5} isLeaf />
        </svg>

        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
            className="absolute top-2 left-2 flex items-center gap-1 bg-zinc-800/80 backdrop-blur rounded px-2 py-1 border border-zinc-700"
        >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[8px] text-zinc-300 font-mono">BFS_ACTIVE</span>
        </motion.div>
      </div>
    </div>
  );
};

const Connection = ({ start, end, delay }) => (
    <>
        <path d={`M${start[0]} ${start[1]} L${end[0]} ${end[1]}`} stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
        <motion.path 
            d={`M${start[0]} ${start[1]} L${end[0]} ${end[1]}`} 
            stroke="#6366f1" 
            strokeWidth="2" 
            strokeLinecap="round" 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
        />
    </>
);

const Node = ({ cx, cy, delay, isRoot, isLeaf }) => (
    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay, type: "spring" }}>
        {isRoot && <circle cx={cx} cy={cy} r="8" fill="#4f46e5" opacity="0.4" className="animate-ping" />}
        <circle cx={cx} cy={cy} r={isLeaf ? "4" : "6"} fill="#18181b" stroke={isRoot ? "#818cf8" : "#52525b"} strokeWidth="2" />
        <motion.circle 
            cx={cx} cy={cy} r={isLeaf ? "2" : "3"} 
            fill={isRoot ? "#818cf8" : "#a5b4fc"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2 }}
        />
    </motion.g>
);


// VISUAL 4: Chaos to Clarity (New Version)
// Concept: Scattered particles converging into a straight line/structure
const ClarityChartSkeleton = () => {
    return (
        <div className="w-full h-full min-h-[8rem] relative flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
             
             {/* Dynamic Grid Background */}
             <div className="absolute inset-0 opacity-30" 
                  style={{ 
                      backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                      backgroundSize: '16px 16px',
                      color: 'var(--tw-colors-zinc-300)' // Tailwind color variable reference for light mode
                  }} 
             >
                {/* Dark mode override for grid color */}
                <style jsx>{`
                    .dark .bg-zinc-950 .absolute {
                        color: var(--tw-colors-zinc-700);
                    }
                `}</style>
             </div>

             {/* The "Chaos" Particles */}
             {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-red-400/80 dark:bg-red-500/80"
                    initial={{ 
                        x: (Math.random() - 0.5) * 200, 
                        y: (Math.random() - 0.5) * 100,
                        opacity: 0 
                    }}
                    animate={{ 
                        x: [null, (i - 6) * 15], // Converge to a line
                        y: [null, 0],           // Center vertically
                        opacity: [0, 1, 1],
                        backgroundColor: ["#f87171", "#34d399"] // Red to Emerald transition
                    }}
                    transition={{ 
                        duration: 2, 
                        delay: i * 0.1, 
                        ease: "easeInOut",
                        times: [0, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 2
                    }}
                />
             ))}

             {/* The "Clarity" Line appearing */}
             <motion.div
                className="absolute h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{ 
                    delay: 1.5, 
                    duration: 1, 
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 2
                }}
             />

             {/* Success Badge */}
             <motion.div 
                initial={{ scale: 0, y: 10 }} 
                animate={{ scale: 1, y: 0 }} 
                transition={{ delay: 2.2, type: "spring", stiffness: 200, repeat: Infinity, repeatDelay: 2 }}
                className="absolute bottom-4 bg-white dark:bg-zinc-800 shadow-lg border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20"
            >
                <div className="bg-emerald-100 dark:bg-emerald-900/50 p-0.5 rounded-full">
                    <Check className="w-3 h-3" /> 
                </div>
                Pattern Found
             </motion.div>
        </div>
    )
}

const ChaosLine = ({ color, delay }) => (
    <motion.path 
        d="M0 25 Q 10 5, 20 35 T 40 15 T 60 45 T 80 5 T 100 25"
        fill="none" stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, delay, repeat: Infinity, repeatType: "reverse" }}
    />
);

export function Problem() {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6">
      <div className="mb-12 flex flex-col items-start space-y-4">
        {/* DARK MODE FIX: Headings pop on dark, subheading is muted */}
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 dark:text-zinc-50 tracking-tight">
          LeetCode Doesn’t Teach. <br />
          <span className="text-zinc-400 dark:text-zinc-500 italic">It Tests.</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-poppins max-w-xl text-md leading-snug">
          Most editorials assume you already know the trick. We believe in visual intuition, not memorizing "trivial" observations.
        </p>
      </div>

      <BentoGrid>
        <BentoGridItem
          className="md:col-span-2 font-poppins"
          title="The 'Black Box' Explanations"
          description="Standard editorials throw math at you without explaining the 'Why'."
          header={<ConfusingCodeSkeleton />}
          icon={<Terminal className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />}
        />
        <BentoGridItem
          className="md:col-span-1"
          title="The 'Trivial' Trap"
          description="Community comments that make you feel like an impostor."
          header={<FrustrationListSkeleton />}
          icon={<MessageSquare className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />}
        />
        <BentoGridItem
          className="md:col-span-1"
          title="Visual Intuition"
          description="We visualize the data structure state."
          header={<VisualSolutionSkeleton />}
          icon={<Check className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />}
        />
        <BentoGridItem
          // DARK MODE FIX: The 'highlighted' card logic needs a dark counterpart
          className="md:col-span-2 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200/50 dark:border-zinc-700/50"
          title={<span className="text-zinc-900 dark:text-zinc-100">You aren't bad at DSA.</span>}
          description="The explanations are bad. Switch to a platform that actually respects your learning curve."
          header={<ClarityChartSkeleton />}
          icon={<AlertCircle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />}
        />
      </BentoGrid>
    </section>
  );
}