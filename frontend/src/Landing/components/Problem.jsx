import React from "react";
import { motion } from "motion/react";
import { X, Check, Terminal, MessageSquare, AlertCircle, Clock, Zap, Search } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE LAYOUT COMPONENTS (Keep these as they were) ---
const BentoGrid = ({ className, children }) => (
  <div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
    {children}
  </div>
);

const BentoGridItem = ({ className, title, description, header, icon }) => (
  <motion.div
    className={cn(
      "row-span-1 rounded-xl group/bento hover:shadow-md transition duration-200 shadow-input dark:shadow-none p-4 bg-white border border-zinc-200 justify-between flex flex-col space-y-4 overflow-hidden relative",
      className
    )}
  >
    {header}
    <div className="group-hover transition duration-200 relative z-10">
      {icon}
      <div className="text-zinc-800 mb-2 mt-2 text-lg font-poppins font-medium">{title}</div>
      <div className="font-normal text-zinc-500 text-sm font-inter max-w-md">{description}</div>
    </div>
  </motion.div>
);

// --- 2. THE "ALL IN" VISUALS ---

// VISUAL 1: The "Compiler Crash" Narrative
// Sequence: Code Types -> Scanner Runs -> Glitch -> Crash
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

      {/* Code Text with staggered typing effect */}
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

      {/* The Crash Popup - Vibrates and Glitches */}
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
// Sequence: Message Slides In -> Highlights -> New Message pushes it down
const FrustrationListSkeleton = () => {
    return (
        <div className="flex flex-col w-full h-full min-h-[8rem] relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            
            {/* The Chat Container */}
            <div className="flex flex-col gap-2.5 p-3 absolute bottom-0 w-full">
                 <ChatBubble 
                    u="User12" 
                    text="This is trivial. Use a Segment Tree." 
                    color="bg-blue-100 text-blue-700"
                    delay={0}
                 />
                 <ChatBubble 
                    u="LeetGod" 
                    text="Why can't you solve this? Easy." 
                    color="bg-orange-100 text-orange-700"
                    delay={1.5}
                 />
                 <ChatBubble 
                    u="Anon" 
                    text="Just memorize the pattern lol." 
                    color="bg-zinc-200 text-zinc-700"
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
            
            {/* Gradient Mask for fading out top comments */}
            <div className="absolute top-0 w-full h-12 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>
    );
};

const ChatBubble = ({ u, text, color, delay }) => (
    <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-center gap-3 p-2 rounded-lg bg-white border border-zinc-100 shadow-sm relative overflow-hidden group"
    >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${color}`}>
            {u[0]}
        </div>
        <p className="text-[10px] text-zinc-600 font-medium font-inter leading-tight">{text}</p>
        
        {/* Shimmer effect on hover/appear */}
        <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ delay: delay + 0.5, duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
        />
    </motion.div>
);


// VISUAL 3: The "Data Flow" Tree
// Sequence: Root Pulses -> Signal Travels Line -> Child Activates -> Repeat
const VisualSolutionSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full min-h-[8rem] bg-zinc-900 rounded-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-zinc-900" />
      
      {/* Dynamic Grid Background */}
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
        {/* Base line */}
        <path d={`M${start[0]} ${start[1]} L${end[0]} ${end[1]}`} stroke="#27272a" strokeWidth="2" strokeLinecap="round" />
        {/* Active Signal Line */}
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
        {/* Glow effect for root */}
        {isRoot && <circle cx={cx} cy={cy} r="8" fill="#4f46e5" opacity="0.4" className="animate-ping" />}
        
        <circle cx={cx} cy={cy} r={isLeaf ? "4" : "6"} fill="#18181b" stroke={isRoot ? "#818cf8" : "#3f3f46"} strokeWidth="2" />
        
        {/* Fill animation */}
        <motion.circle 
            cx={cx} cy={cy} r={isLeaf ? "2" : "3"} 
            fill={isRoot ? "#818cf8" : "#a5b4fc"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2 }}
        />
    </motion.g>
);


// VISUAL 4: Chaos to Clarity
// Sequence: Multi-line chaos -> Merge -> Straight Line -> Success State
const ClarityChartSkeleton = () => {
    return (
        <div className="w-full h-full min-h-[8rem] relative flex items-center justify-center bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden">
             {/* Background Grid */}
             <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

             {/* 1. The Chaos Phase (Multiple jagged lines) */}
             <svg viewBox="0 0 100 50" className="w-full h-full absolute inset-0 opacity-30">
                <ChaosLine color="#ef4444" delay={0} />
                <ChaosLine color="#f59e0b" delay={0.2} />
                <ChaosLine color="#8b5cf6" delay={0.4} />
             </svg>

             {/* 2. The Clarity Phase (Strong Green Line drawing over) */}
             <svg viewBox="0 0 100 50" className="w-full h-full relative z-10 px-4">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                </defs>
                <motion.path 
                    d="M0 45 C 20 40, 40 10, 100 5" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                />
             </svg>

             {/* 3. Success Badge Pop */}
             <motion.div 
                initial={{ scale: 0, rotate: -20 }} 
                animate={{ scale: 1, rotate: 0 }} 
                transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
                className="absolute top-3 right-3 bg-white shadow-lg border border-emerald-100 text-emerald-600 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20"
            >
                <div className="bg-emerald-100 p-0.5 rounded-full">
                    <Check className="w-3 h-3" /> 
                </div>
                Optimized
             </motion.div>
             
             {/* Floating Particles for "Magic" feel */}
             <div className="absolute inset-0 pointer-events-none">
                 {[...Array(5)].map((_, i) => (
                     <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        initial={{ x: 50 + Math.random()*20, y: 30, opacity: 0 }}
                        animate={{ y: -20, opacity: [0, 1, 0] }}
                        transition={{ delay: 2.2 + Math.random(), duration: 1.5, repeat: Infinity }}
                     />
                 ))}
             </div>
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
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 tracking-tight">
          LeetCode Doesn’t Teach. <br />
          <span className="text-zinc-400 italic">It Tests.</span>
        </h2>
        <p className="text-zinc-500 font-poppins max-w-xl text-md leading-snug">
          Most editorials assume you already know the trick. We believe in visual intuition, not memorizing "trivial" observations.
        </p>
      </div>

      <BentoGrid>
        <BentoGridItem
          className="md:col-span-2 font-poppins"
          title="The 'Black Box' Explanations"
          description="Standard editorials throw math at you without explaining the 'Why'."
          header={<ConfusingCodeSkeleton />}
          icon={<Terminal className="h-4 w-4 text-zinc-500" />}
        />
        <BentoGridItem
          className="md:col-span-1"
          title="The 'Trivial' Trap"
          description="Community comments that make you feel like an impostor."
          header={<FrustrationListSkeleton />}
          icon={<MessageSquare className="h-4 w-4 text-zinc-500" />}
        />
        <BentoGridItem
          className="md:col-span-1"
          title="Visual Intuition"
          description="We visualize the data structure state."
          header={<VisualSolutionSkeleton />}
          icon={<Check className="h-4 w-4 text-zinc-500" />}
        />
        <BentoGridItem
          className="md:col-span-2 bg-zinc-50 border-zinc-200/50"
          title={<span className="text-zinc-900">You aren't bad at DSA.</span>}
          description="The explanations are bad. Switch to a platform that actually respects your learning curve."
          header={<ClarityChartSkeleton />}
          icon={<AlertCircle className="h-4 w-4 text-zinc-500" />}
        />
      </BentoGrid>
    </section>
  );
}