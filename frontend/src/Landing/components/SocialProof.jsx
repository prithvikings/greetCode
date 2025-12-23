import React from "react";
import { motion } from "motion/react";
import { Star, Quote, CheckCircle2, TrendingUp } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. THE LOGO MARQUEE (Infinite Scroll) ---
const CompanyLogos = () => {
  const companies = [
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Uber", url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { name: "Spotify", url: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Airbnb", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  ];

  return (
    <div className="relative w-full overflow-hidden mb-24 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8">
      {/* Fade Masks - CRITICAL FIX: Must match the bg color (white vs zinc-900) */}
      <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10" />
      
      <div className="flex w-full">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-16 whitespace-nowrap"
        >
          {companies.map((company, i) => (
          
            <div key={i} className="relative w-32 h-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in cursor-pointer dark:grayscale-0 dark:opacity-100 dark:hover:grayscale-100">
               <img 
                 src={company.url} 
                 alt={company.name} 
                 className="max-w-full max-h-full object-contain"
               />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- 2. THE TESTIMONIAL CARD ---
const ReviewCard = ({ name, role, company, image, quote, stats, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className={cn(
        "p-6 rounded-2xl relative group transition-colors duration-300",
        // Light Mode
        "bg-white border border-zinc-100 shadow-xl shadow-zinc-200/40",
        // Dark Mode
        "dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none"
    )}
  >
    {/* Quote Icon Background */}
    <div className="absolute top-4 right-6 opacity-10">
        <Quote className="w-10 h-10 text-sky-500 fill-sky-500" />
    </div>

    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden relative">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
            {name}
            <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-50 dark:fill-emerald-900/30" />
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{role} @ {company}</p>
      </div>
    </div>

    {/* Content */}
    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 relative z-10 font-inter">
      "{quote}"
    </p>

    {/* Footer / Stats */}
    <div className="pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
       <div className="flex gap-0.5">
           {[...Array(5)].map((_, i) => (
               <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
           ))}
       </div>
       <div className="text-xs font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20 px-2 py-1 rounded border border-sky-100 dark:border-sky-800 flex items-center gap-1">
           <TrendingUp className="w-3 h-3" />
           {stats}
       </div>
    </div>
  </motion.div>
);

// --- 3. MAIN COMPONENT ---
const SocialProof = () => {
  const reviews = [
    {
        name: "Ashish Kumar.",
        role: "Frontend Engineer",
        company: "Vercel",
        quote: "I failed Google interviews 3 times. After 1 month on this platform, I finally understood DP patterns instead of memorizing them.",
        stats: "Solved 142 Problems",
    },
    {
        name: "Sara Khan.",
        role: "Software Engineer",
        company: "Amazon",
        quote: "The visual explanations are a cheat code. It felt like I had a senior engineer sitting next to me explaining the logic.",
        stats: "Streak: 45 Days",
    },
    {
        name: "Deepak kumar.",
        role: "Backend Dev",
        company: "Stripe",
        quote: "LeetCode editorials are trash compared to this. The 'Time Limit Exceeded' visualizations saved my life.",
        stats: "Top 5% Rank",
    },
    {
        name: "Priya Mishra.",
        role: "Full Stack",
        company: "Atlassian",
        quote: "Zero fluff. Just the patterns that actually show up in interviews. I landed the offer in 3 weeks.",
        stats: "Offer Accepted",
    },
    {
        name: "Aakash Singh.",
        role: "Student",
        company: "MIT",
        quote: "Most platforms make you feel dumb. This one makes you feel like a genius who just hasn't been taught correctly yet.",
        stats: "Learned 12 Patterns",
    },
    {
        name: "Rahul Raj.",
        role: "SDE II",
        company: "Uber",
        quote: "I cancelled my LeetCode Premium subscription. This is all I need.",
        stats: "Saved $159",
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-poppins font-medium text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
          Trusted by engineers at top companies.
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 font-poppins text-sm w-md mx-auto">
          Join 10,000+ developers who stopped memorizing and started understanding.
        </p>
      </div>

      {/* 2. Infinite Marquee */}
      <CompanyLogos />

      {/* 3. The Wall of Love (Grid) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
             <ReviewCard key={i} index={i} {...review} />
          ))}
        </div>
      </div>

      {/* 4. Bottom Trust Indicator */}
      <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                    </div>
                ))}
             </div>
             <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium pl-2">
                 Rated <span className="text-zinc-900 dark:text-zinc-100 font-bold">4.9/5</span> by active learners
             </span>
          </div>
      </div>

    </section>
  );
};

export default SocialProof;