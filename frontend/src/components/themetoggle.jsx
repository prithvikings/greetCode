// src/components/togglebtn.jsx
"use client";

import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
// Remove: import { useState } from "react"; 
import { useTheme } from '../context/ThemeContext';

function Togglebtn() {
  // Use the theme state directly from the context.
  // The local 'themes' state is redundant and removed.
  const { theme, toggleTheme } = useTheme();

  // The button's pressed state is now directly tied to the global theme state.
  return (
    <div>
      <Toggle
        // 1. Call the function that actually toggles the global theme
        onClick={toggleTheme}
        variant="outline"
        className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted cursor-pointer"
        
        // 2. Control the internal state/appearance using the global theme
        pressed={theme === "dark"}
        
        // 3. This prop is now redundant since we use 'onClick' to handle the toggle
        // and we don't need to manually update the local state.
        // onPressedChange={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        
        // 4. Update aria-label to use the global theme state
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Icon logic now uses the internal 'pressed' state, 
            which is set by 'theme === "dark"' */}
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}

export { Togglebtn };