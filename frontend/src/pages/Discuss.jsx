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
  Hash,
  Clock,
  MoreHorizontal
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// MOCK DATA (Replace with API call later)
const MOCK_POSTS = [
  {
    id: 1,
    title: "Google L4 Interview Experience - 2024 (Offer Accepted)",
    author: "dev_wizard",
    time: "2 hours ago",
    content: "I recently interviewed for the L4 position at Google. Here is the breakdown of the rounds...",
    tags: ["Interview Experience", "Google", "Hard"],
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
    content: "Many people struggle with the DP approach, but the two-pointer approach is actually O(1) space...",
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
    content: "I've been trying to learn System Design but resources are overwhelming. Any tips?",
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      
      {/* NAVBAR PLACEHOLDER (Assuming you have a main nav) */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              Community
           </div>
           
           {/* Search Bar */}
           <div className="hidden md:flex items-center bg-zinc-900 border border-zinc-700/50 rounded-full px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all">
              <Search className="w-4 h-4 text-zinc-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder-zinc-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           <button 
           onClick={() => navigate('/discuss/create')}
           className="btn bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
              <PenSquare className="w-4 h-4" />
              New Post
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR (Categories) */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
             <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3 px-2">Categories</h3>
             <div className="space-y-1">
               {CATEGORIES.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                     activeCategory === cat 
                       ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                       : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
             <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Trending Tags
             </h3>
             <div className="flex flex-wrap gap-2">
                {["#Google", "#DP", "#SystemDesign", "#Resume", "#Blind75"].map(tag => (
                   <span key={tag} className="text-xs px-2 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/30 cursor-pointer transition-colors">
                      {tag}
                   </span>
                ))}
             </div>
          </div>
        </div>

        {/* MAIN FEED */}
        <div className="lg:col-span-3 space-y-4">
           
           {/* Mobile Categories (Scrollable) */}
           <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                     activeCategory === cat 
                       ? "bg-indigo-500 text-white border-indigo-600" 
                       : "bg-zinc-900 text-zinc-400 border-zinc-800"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
           </div>

           {/* Filter Bar */}
           <div className="flex items-center justify-between mb-2">
              <div className="flex gap-4 text-sm text-zinc-400">
                 <button className="text-zinc-100 font-medium hover:text-indigo-400 transition-colors">Newest</button>
                 <button className="hover:text-indigo-400 transition-colors">Hot</button>
                 <button className="hover:text-indigo-400 transition-colors">Most Voted</button>
              </div>
              <button className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300">
                 <Filter className="w-3 h-3" /> Filter
              </button>
           </div>

           {/* Posts List */}
           {MOCK_POSTS.map((post) => (
             <div 
                key={post.id}
                onClick={() => navigate(`/discuss/${post.id}`)}
                className="group bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 rounded-xl p-5 transition-all hover:bg-zinc-900 cursor-pointer"
             >
                <div className="flex items-start gap-4">
                   {/* Author Avatar */}
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {post.author[0].toUpperCase()}
                   </div>

                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate">
                            {post.title}
                         </h2>
                         {post.category === "Interview" && (
                            <span className="hidden sm:inline-block px-2 py-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] rounded uppercase font-bold tracking-wider">
                               Interview
                            </span>
                         )}
                      </div>
                      
                      <p className="text-zinc-400 text-sm line-clamp-2 mb-3">
                         {post.content}
                      </p>

                      {/* Footer Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                         <span className="flex items-center gap-1 text-zinc-400">
                            <span className="font-medium text-indigo-400">@{post.author}</span>
                         </span>
                         <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.time}
                         </span>
                         
                         <div className="flex items-center gap-4 ml-auto">
                            <div className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors">
                               <Eye className="w-4 h-4" /> {post.views}
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-pink-500 transition-colors">
                               <Heart className="w-4 h-4" /> {post.votes}
                            </div>
                            <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
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
  );
};

export default Discuss;