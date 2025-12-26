// src/pages/Discuss.jsx
import React, { useState } from "react";
import { 
  MessageSquare, 
  Heart, 
  Eye, 
  Search, 
  PenSquare, 
  Filter, 
  TrendingUp, 
  Clock,
  Hash
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import{ Togglebtn} from "../components/themetoggle";
// MOCK DATA
const MOCK_POSTS = [
  {
    id: 1,
    title: "Google L4 Interview Experience - 2024 (Offer Accepted)",
    author: "dev_wizard",
    time: "2 hours ago",
    content: "I recently interviewed for the L4 position at Google. Here is the breakdown of the rounds, including the system design portion...",
    tags: ["Interview", "Google", "Hard"],
    votes: 452,
    views: "12k",
    comments: 89,
    category: "Interview",
  },
  {
    id: 2,
    title: "Optimal Solution for 'Trapping Rain Water' using Two Pointers",
    author: "algo_master",
    time: "5 hours ago",
    content: "Many people struggle with the DP approach, but the two-pointer approach is actually O(1) space and much more intuitive...",
    tags: ["Solution", "Array", "Two Pointers"],
    votes: 120,
    views: "3.4k",
    comments: 12,
    category: "Solution",
  },
  {
    id: 3,
    title: "Why is System Design so hard for freshers?",
    author: "newbie_coder",
    time: "1 day ago",
    content: "I've been trying to learn System Design but resources are overwhelming. Alex Xu's book seems great but I get lost...",
    tags: ["General", "System Design"],
    votes: 85,
    views: "5k",
    comments: 45,
    category: "General",
  },
];

const CATEGORIES = ["All Topics", "Interview Experience", "Patterns", "General", "Compensation"];

const Discuss = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-rubik text-zinc-800 dark:text-zinc-200 selection:bg-sky-500/30">
      
      {/* NAVBAR PLACEHOLDER 
        Note: The backdrop blur and border styles now match the Hero's "Watch Sample" button aesthetic.
      */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
           
           {/* Logo / Brand */}
           <div className="flex items-center gap-2 font-spacegrotesk font-bold text-xl tracking-tight text-zinc-800 dark:text-zinc-100">
              <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <MessageSquare className="w-5 h-5 text-sky-500" />
              </div>
              <span>Community</span>
           </div>
           
           {/* Search Bar - Recessed Style */}
           <div className="hidden md:flex items-center group relative w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400 group-focus-within:text-sky-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl leading-5 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/50 sm:text-sm transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           {/* New Post Button - Matches Hero "Start Solving" Button */}
           <div className="flex items-center gap-2">
            <Togglebtn />
            <button 
            onClick={() => navigate('/discuss/create')}
            className="
                font-spacegrotesk font-medium text-sm
                flex items-center gap-2 px-4 py-2 rounded-xl
                bg-sky-500 hover:bg-sky-600
                cursor-pointer text-white 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
                active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
                active:translate-y-[1px]
                transition-all duration-200
            ">
              <PenSquare className="w-4 h-4" />
              <span className="hidden sm:inline">New Post</span>
           </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-spacegrotesk font-medium text-zinc-800 dark:text-zinc-100">
            Developer <span className="font-instrument italic text-zinc-500 dark:text-zinc-400">Discussions</span>
          </h1>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400 max-w-2xl font-rubik">
            Join the conversation. Share interview experiences, ask about system design, or debate the best way to center a div.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR */}
          <div className="hidden lg:block space-y-8">
            {/* Categories */}
            <div>
               <h3 className="font-spacegrotesk text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 px-2">
                 Feeds
               </h3>
               <div className="space-y-2.5">
                 {CATEGORIES.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`cursor-pointer w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                       activeCategory === cat 
                         ? "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-sky-600 dark:text-sky-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" 
                         : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
               </div>
            </div>

            {/* Trending */}
            <div>
               <h3 className="font-spacegrotesk text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 px-2 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" /> Trending
               </h3>
               <div className="flex flex-wrap gap-2">
                  {["#Google", "#DP", "#SystemDesign", "#Resume", "#Blind75"].map(tag => (
                     <span key={tag} className="
                        text-xs px-3 py-1.5 rounded-lg font-medium
                        bg-white dark:bg-zinc-900 
                        border border-zinc-200 dark:border-zinc-800 
                        text-zinc-500 dark:text-zinc-400
                        hover:border-sky-300 dark:hover:border-sky-700
                        hover:text-sky-600 dark:hover:text-sky-400
                        cursor-pointer transition-all shadow-sm
                     ">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
          </div>

          {/* MAIN FEED */}
          <div className="lg:col-span-3">
             
             {/* Mobile Filter Scroll */}
             <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 scrollbar-hide -mx-4 px-4 mb-4">
                {CATEGORIES.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                       activeCategory === cat 
                         ? "bg-sky-500 text-white border-sky-600 shadow-md" 
                         : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
             </div>

             {/* Filter Tabs */}
             <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-6 text-sm">
                   {['Newest', 'Hot', 'Most Voted'].map((filter) => (
                      <button key={filter} className="cursor-pointer group relative py-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium">
                        {filter}
                        <span className="absolute bottom-[-9px] left-0 w-full h-[2px] bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                      </button>
                   ))}
                </div>
                <button className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                   <Filter className="w-3 h-3" /> Filter
                </button>
             </div>

             {/* Posts */}
             <div className="space-y-4">
               {MOCK_POSTS.map((post) => (
                 <div 
                   key={post.id}
                   onClick={() => navigate(`/discuss/${post.id}`)}
                   className="
                      group relative overflow-hidden cursor-pointer
                      bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm
                      border border-zinc-200 dark:border-zinc-800
                      hover:border-zinc-300 dark:hover:border-zinc-700
                      rounded-2xl p-6
                      transition-all duration-300
                      hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                      dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
                      active:scale-[0.995]
                   "
                 >
                   <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold text-sm shrink-0 shadow-inner">
                         {post.author[0].toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                         {/* Header: Title & Tags */}
                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                            <h2 className="text-lg font-spacegrotesk font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                               {post.title}
                            </h2>
                            {post.category === "Interview" && (
                               <span className="self-start sm:self-center px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20 text-[10px] rounded uppercase font-bold tracking-wider shrink-0">
                                  Interview
                               </span>
                            )}
                         </div>
                         
                         <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4 font-rubik leading-relaxed">
                            {post.content}
                         </p>

                         {/* Footer Metadata */}
                         <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-400">
                            <span className="flex items-center gap-1 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                               <span className="text-zinc-800 dark:text-zinc-200">@{post.author}</span>
                            </span>
                            <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                            <span className="flex items-center gap-1">
                               <Clock className="w-3 h-3" /> {post.time}
                            </span>
                            
                            <div className="flex items-center gap-5 ml-auto">
                               <div className="flex items-center gap-1.5 hover:text-sky-500 transition-colors">
                                  <Eye className="w-4 h-4" /> {post.views}
                               </div>
                               <div className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                                  <Heart className="w-4 h-4" /> {post.votes}
                               </div>
                               <div className="flex items-center gap-1.5 hover:text-sky-500 transition-colors">
                                  <MessageSquare className="w-4 h-4" /> {post.comments}
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discuss;