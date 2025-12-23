import React from "react";
import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Heart, Circle, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Helper: Footer Link ---
const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      // DARK MODE FIX: Text colors adaptive (Zinc-600 -> Zinc-900 on hover in Light)
      className="text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200 text-sm font-inter flex items-center gap-1 group"
    >
      {children}
      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
    </a>
  </li>
);

// --- Helper: Social Icon ---
const SocialIcon = ({ icon: Icon, href }) => (
  <a 
    href={href}
    // DARK MODE FIX: Adaptive background and borders
    className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border",
        // Light Mode
        "bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 hover:border-zinc-300",
        // Dark Mode
        "dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
    )}
  >
    <Icon className="w-4 h-4" />
  </a>
);

// --- MAIN COMPONENT ---
const Footer = () => {
  return (
    // DARK MODE FIX: Main container background changed from fixed zinc-950 to adaptive
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Brand & Links */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-24">
          
          {/* Column 1: Brand (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-6">
            <h3 className="text-2xl font-poppins font-medium text-zinc-900 dark:text-white tracking-tight">
              GreetCode<span className="text-sky-500">.</span>
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs font-inter">
              The modern way to master Data Structures and Algorithms. Built for engineers who care about the "why", not just the "how".
            </p>
            <div className="flex gap-4">
               <SocialIcon icon={Twitter} href="#" />
               <SocialIcon icon={Github} href="#" />
               <SocialIcon icon={Linkedin} href="#" />
            </div>
          </div>

          {/* Column 2: Product (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-6">
             <h4 className="text-zinc-900 dark:text-zinc-100 font-medium font-poppins">Product</h4>
             <ul className="space-y-4">
                <FooterLink href="#">Patterns</FooterLink>
                <FooterLink href="#">Visualizer</FooterLink>
                <FooterLink href="#">Roadmap</FooterLink>
                <FooterLink href="#">Pricing</FooterLink>
             </ul>
          </div>

          {/* Column 3: Resources (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-6">
             <h4 className="text-zinc-900 dark:text-zinc-100 font-medium font-poppins">Resources</h4>
             <ul className="space-y-4">
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Community</FooterLink>
                <FooterLink href="#">Cheatsheets</FooterLink>
                <FooterLink href="#">Success Stories</FooterLink>
             </ul>
          </div>

          {/* Column 4: Company (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-6">
             <h4 className="text-zinc-900 dark:text-zinc-100 font-medium font-poppins">Company</h4>
             <ul className="space-y-4">
                <FooterLink href="#">About</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="#">Legal</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
             </ul>
          </div>

           {/* Column 5: Status (2 cols) */}
           <div className="col-span-2 md:col-span-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 font-mono">All Systems Normal</span>
              </div>
           </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 dark:text-zinc-600 text-sm font-inter">
               &copy; {new Date().getFullYear()} GreetCode Inc. All rights reserved.
            </p>
            
            <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-600 text-sm font-inter">
                <span>Made with</span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
                <span>by Prithvikings, for Engineers.</span>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;