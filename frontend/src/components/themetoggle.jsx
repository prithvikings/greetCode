"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const DURATION = 0.25; // seconds

function Togglebtn() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // 🔑 VISUAL STATE (controls animation only)
  const [visualDark, setVisualDark] = useState(isDark);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // 1️⃣ Trigger icon animation FIRST
    setVisualDark((prev) => !prev);

    // 2️⃣ AFTER animation completes → change actual theme
    setTimeout(() => {
      toggleTheme();
      setIsAnimating(false);
    }, DURATION * 1000);
  };

  return (
    <Toggle
      onClick={handleToggle}
      pressed={isDark}
      variant="outline"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="
        relative size-9 corner-squircel
        border border-zinc-200 dark:border-zinc-700
        bg-white/70 dark:bg-zinc-900/60
        backdrop-blur-sm
        shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
        cursor-pointer
        active:scale-[0.96]
        overflow-hidden
        transition-shadow
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {visualDark ? (
          <motion.span
            key="moon"
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 12, opacity: 0 }}
            transition={{
              duration: DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon size={16} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 12, opacity: 0 }}
            transition={{
              duration: DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun size={16} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </Toggle>
  );
}

export { Togglebtn };
