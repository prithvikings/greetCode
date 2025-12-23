"use client";
import { useState, useEffect } from "react";
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import { motion } from "motion/react";

const GitHubCalendar = ({
  data,
  // Removed the first "empty" color from here. We handle empty states with Tailwind now.
  activeColors = ["#bbf7d0", "#86efac", "#4ade80", "#22c55e"]
}) => {
  const [contributions, setContributions] = useState([]);
  const today = new Date();
  const startDate = subDays(today, 364); 
  const weeks = 53;

  useEffect(() => {
    setContributions(data.map((item) => ({ ...item, date: new Date(item.date) })));
  }, [data]);

  // Logic: Return NULL if count is 0, otherwise return the specific green
  const getColor = (count) => {
    if (count === 0) return null; // Let Tailwind handle empty state
    if (count === 1) return activeColors[0];
    if (count === 2) return activeColors[1];
    if (count === 3) return activeColors[2];
    return activeColors[3] || activeColors[activeColors.length - 1];
  };

  const renderWeeks = () => {
    const weeksArray = [];
    let currentWeekStart = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < weeks; i++) {
      const weekDays = eachDayOfInterval({
        start: currentWeekStart,
        end: endOfWeek(currentWeekStart, { weekStartsOn: 0 }),
      });

      weeksArray.push(
        <div key={i} className="flex flex-col gap-1">
          {weekDays.map((day, dayIndex) => {
            const contribution = contributions.find((c) => isSameDay(new Date(c.date), day));
            const count = contribution?.count || 0;
            const color = getColor(count);

            return (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                    delay: i * 0.01 + dayIndex * 0.005,
                    duration: 0.4,
                    ease: "easeOut"
                }}
                whileHover={{ 
                    scale: 1.2, 
                    zIndex: 10,
                    transition: { duration: 0.1 }
                }}
                
                // VISIBILITY FIX:
                // If color exists (count > 0), use it. 
                // If null (count == 0), fall back to Tailwind classes.
                className={`w-3 h-3 rounded-[2px] cursor-pointer ${
                    color ? '' : 'bg-zinc-100 dark:bg-zinc-800/50'
                }`}
                style={{ backgroundColor: color || undefined }}
                
                title={`${format(day, "PPP")}: ${count} contributions`}
              />
            );
          })}
        </div>
      );
      currentWeekStart = addDays(currentWeekStart, 7);
    }

    return weeksArray;
  };

  const renderMonthLabels = () => {
    const months = [];
    let currentMonth = startDate;
    for (let i = 0; i < 12; i++) {
      months.push(
        // Text Color Fix: Zinc-400 is readable on both White and Black backgrounds
        <span key={i} className="text-xs text-zinc-400 font-medium font-inter">
          {format(currentMonth, "MMM")}
        </span>
      );
      currentMonth = addDays(currentMonth, 30);
    }
    return months;
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    // CONTAINER FIX:
    // Light Mode: White bg, Zinc-200 border, Shadow-sm
    // Dark Mode: Zinc-900 bg, Zinc-800 border
    <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50 backdrop-blur-sm shadow-sm">
      <div className="flex">
        {/* Day Labels */}
        <div className="flex flex-col justify-between mt-6 mr-3">
          {dayLabels.map((day, index) => (
            (index % 2 === 1) ? (
                <span key={index} className="text-[10px] text-zinc-400 h-3 leading-[12px] font-inter">
                {day}
                </span>
            ) : <div key={index} className="h-3" />
          ))}
        </div>

        {/* The Grid */}
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex w-full justify-between gap-4 mb-2 pl-1">
              {renderMonthLabels()}
          </div>
          <div className="flex gap-1">
              {renderWeeks()}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-end gap-2 text-xs items-center text-zinc-400 font-inter">
        <span>Less</span>
        {/* Empty State Legend */}
        <div className="w-3 h-3 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/50" />
        
        {/* Active States Legend */}
        {activeColors.map((color, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className="w-3 h-3 rounded-[2px]"
            style={{ backgroundColor: color }} 
           />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export { GitHubCalendar };