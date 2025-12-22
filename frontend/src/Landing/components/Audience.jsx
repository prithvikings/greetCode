import React from "react";
import { motion } from "framer-motion";
import { Check, X, User, UserMinus } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE LIST ITEMS (Static, Clean, Precise) ---
const ListItem = ({ text, type, index }) => {
  const isPositive = type === "positive";
  const Icon = isPositive ? Check : X;
  
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex items-start space-x-3"
    >
      <div className={cn(
        "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border",
        isPositive 
          ? "bg-sky-50 border-sky-200 text-sky-600" 
          : "bg-zinc-100 border-zinc-200 text-zinc-400"
      )}>
        <Icon className="w-3 h-3" />
      </div>
      <span className={cn(
        "text-sm leading-relaxed font-medium",
        isPositive ? "text-zinc-700" : "text-zinc-500 line-through decoration-zinc-300"
      )}>
        {text}
      </span>
    </motion.li>
  );
};

// --- 2. THE MAIN COMPONENT ---
export function Audience() {
  return (
    <section className="py-24 px-6 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Centered & Calm */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-zinc-900 tracking-tight">
            Who is this for?
          </h2>
          <p className="text-zinc-500 font-inter max-w-lg mx-auto">
            We prioritize depth over breadth. We are not a solution for everyone, and that is by design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT CARD: "The Builder" (Solid, Elevated, Clear) */}
          <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden group">
            {/* Subtle top highlight line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-zinc-900" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 text-zinc-900">
                 <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 font-poppins">The Engineer</h3>
                <p className="text-xs text-sky-600 font-medium tracking-wide uppercase mt-0.5">Recommended</p>
              </div>
            </div>

            <ul className="space-y-4">
              <ListItem type="positive" index={0} text="You want to understand the first principles of every algorithm." />
              <ListItem type="positive" index={1} text="You are tired of 'tricks' that don't work in real interviews." />
              <ListItem type="positive" index={2} text="You care about writing clean, maintainable code." />
              <ListItem type="positive" index={3} text="You are willing to struggle to gain mastery." />
            </ul>
          </div>


          {/* RIGHT CARD: "The Tourist" (Recessed, Transparent, Muted) */}
          <div className="p-8 rounded-xl border border-dashed border-zinc-300 bg-transparent relative opacity-80 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-4 mb-8 grayscale opacity-70">
              <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center border border-zinc-300 text-zinc-500">
                 <UserMinus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-700 font-poppins">The Tourist</h3>
                <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase mt-0.5">Not Recommended</p>
              </div>
            </div>

            <ul className="space-y-4">
              <ListItem type="negative" index={0} text="You just want to copy-paste solutions to pass a test." />
              <ListItem type="negative" index={1} text="You get frustrated if the answer isn't given instantly." />
              <ListItem type="negative" index={2} text="You believe memorizing 500 problems is the key." />
              <ListItem type="negative" index={3} text="You don't care about time complexity or optimization." />
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}