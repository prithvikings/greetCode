import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle"; // Assuming you have this
import { 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Share2, 
  MoreHorizontal,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  CornerDownRight
} from "lucide-react";

// --- MOCK DATA (Updated colors to match design system) ---
const POST_DATA = {
  id: 1,
  title: "Google L4 Interview Experience - 2024 (Offer Accepted)",
  author: "dev_wizard",
  authorRep: 1542,
  time: "2 hours ago",
  views: "12k",
  upvotes: 452,
  tags: ["Interview Experience", "Google", "Hard", "System Design"],
  // Updated HTML content to match zinc theme
  content: `
    <p class="mb-6 font-rubik text-zinc-600 dark:text-zinc-300">I recently interviewed for the L4 position at Google. Here is the breakdown of the rounds:</p>
    
    <h3 class="text-xl font-spacegrotesk font-bold mb-3 text-zinc-900 dark:text-zinc-100">Round 1: DSA (45 mins)</h3>
    <p class="mb-4 font-rubik text-zinc-600 dark:text-zinc-300">The question was a variation of <strong>Merge Intervals</strong>. I used a sorting approach.</p>
    
    <div class="bg-zinc-100 dark:bg-zinc-900/80 rounded-xl p-4 mb-8 border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-inner">
      <code class="text-sm font-mono text-zinc-700 dark:text-emerald-400">
        // Time Complexity: O(N log N)<br/>
        function merge(intervals) {<br/>
        &nbsp;&nbsp;if (!intervals.length) return [];<br/>
        &nbsp;&nbsp;intervals.sort((a, b) => a[0] - b[0]);<br/>
        &nbsp;&nbsp;const result = [intervals[0]];<br/>
        &nbsp;&nbsp;// ... rest of code<br/>
        }
      </code>
    </div>

    <h3 class="text-xl font-spacegrotesk font-bold mb-3 text-zinc-900 dark:text-zinc-100">Round 2: System Design</h3>
    <p class="mb-4 font-rubik text-zinc-600 dark:text-zinc-300">Design a URL Shortener like Bit.ly. Focused heavily on database schema and collision handling.</p>
  `,
};

const COMMENTS = [
  {
    id: 1,
    author: "algo_master",
    time: "1 hour ago",
    content: "Great explanation on the interval question! Did they ask about the edge case where intervals touch but don't overlap?",
    votes: 24,
    replies: [
      {
        id: 2,
        author: "dev_wizard",
        isAuthor: true,
        time: "45 mins ago",
        content: "Yes! I handled that by using >= instead of > in the condition.",
        votes: 8,
      }
    ]
  },
  {
    id: 3,
    author: "frontend_fan",
    time: "30 mins ago",
    content: "Congrats on the offer! How long did the whole process take?",
    votes: 5,
    replies: []
  }
];

const DiscussPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [commentText, setCommentText] = useState("");

  // Reusable Badge Component (Updated to Sky/Zinc)
  const TagBadge = ({ label }) => (
    <span className="
      px-2.5 py-1 rounded-lg text-xs font-medium 
      bg-zinc-100 dark:bg-zinc-900 
      text-zinc-600 dark:text-zinc-400 
      border border-zinc-200 dark:border-zinc-800 
      hover:border-sky-300 dark:hover:border-sky-700
      hover:text-sky-600 dark:hover:text-sky-400
      transition-all cursor-pointer shadow-sm
    ">
      #{label}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-rubik text-zinc-800 dark:text-zinc-200 selection:bg-sky-500/30">
      
      {/* NAVBAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="hidden md:block h-6 w-px bg-zinc-200 dark:bg-zinc-800"></div>
              <span className="hidden md:block font-spacegrotesk font-medium text-sm text-zinc-500 dark:text-zinc-400">
                Post <span className="font-instrument italic">#{id || 1}</span>
              </span>
           </div>
           
           <div className="flex items-center gap-3">
              <Togglebtn />
              
              {/* Primary Action Button (Matches Hero) */}
              <button className="
                hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl
                bg-sky-500 hover:bg-sky-600
                text-white text-sm font-spacegrotesk font-medium
                [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
                active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
                active:translate-y-[1px]
                transition-all duration-200
              ">
                 <MessageSquare className="w-4 h-4" /> Reply
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Main Content (3/4 width) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* POST CARD */}
          <div className="
            bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
            border border-zinc-200 dark:border-zinc-800 
            rounded-2xl p-6 md:p-10 shadow-sm
          ">
            
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-5">
                 {POST_DATA.tags.map(tag => <TagBadge key={tag} label={tag} />)}
              </div>
              <h1 className="text-3xl md:text-4xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-6">
                {POST_DATA.title}
              </h1>
              
              <div className="flex items-center justify-between py-5 border-b border-zinc-100 dark:border-zinc-800/50">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-sm text-zinc-700 dark:text-zinc-300 shadow-inner">
                       {POST_DATA.author[0].toUpperCase()}
                    </div>
                    <div>
                       <div className="font-spacegrotesk font-semibold text-sm text-zinc-900 dark:text-zinc-200 hover:text-sky-500 cursor-pointer transition-colors">
                          @{POST_DATA.author}
                       </div>
                       <div className="text-xs text-zinc-500 flex items-center gap-2 mt-0.5">
                          <span>{POST_DATA.time}</span>
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {POST_DATA.views}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all">
                       <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 transition-all">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </div>

            {/* Post Body */}
            <div 
              className="prose prose-zinc dark:prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: POST_DATA.content }}
            />

            {/* Post Footer / Actions */}
            <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
               <div className="flex items-center bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                  <button className="p-2 px-4 hover:bg-white dark:hover:bg-zinc-900 text-sky-600 dark:text-sky-500 transition-colors flex items-center gap-2 border-r border-zinc-200 dark:border-zinc-800">
                     <ThumbsUp className="w-4 h-4" /> <span className="font-bold font-spacegrotesk">{POST_DATA.upvotes}</span>
                  </button>
                  <button className="p-2 px-4 hover:bg-white dark:hover:bg-zinc-900 text-zinc-500 hover:text-red-500 transition-colors">
                     <ThumbsDown className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>

          {/* COMMENT SECTION */}
          <div className="space-y-6">
              <h3 className="text-xl font-spacegrotesk font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
               Comments <span className="text-sm font-normal text-zinc-500 font-rubik">(24)</span>
              </h3>

              {/* Comment Input - Recessed Look */}
              <div className="
                relative
                bg-zinc-100/50 dark:bg-zinc-900/50 
                border border-zinc-200 dark:border-zinc-800 
                rounded-2xl p-4 
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
              ">
                 <textarea
                   className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 resize-none min-h-[100px] text-sm"
                   placeholder="What are your thoughts? (Markdown supported)"
                   value={commentText}
                   onChange={(e) => setCommentText(e.target.value)}
                 />
                 <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="text-xs text-zinc-400 dark:text-zinc-600 flex gap-3 font-medium">
                       <button className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Bold</button>
                       <button className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Italic</button>
                       <button className="hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">Code</button>
                    </div>
                    <button className="
                        px-4 py-1.5 rounded-lg text-sm font-spacegrotesk font-medium
                        bg-zinc-900 dark:bg-zinc-100
                        text-white dark:text-zinc-900
                        hover:bg-zinc-800 dark:hover:bg-zinc-200
                        transition-all shadow-md
                    ">
                       Comment
                    </button>
                 </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                 {COMMENTS.map((comment) => (
                   <div key={comment.id} className="group">
                      {/* Parent Comment */}
                      <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex-shrink-0 shadow-inner"></div>
                         <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                               <span className="font-spacegrotesk font-bold text-sm text-zinc-900 dark:text-zinc-200">{comment.author}</span>
                               <span className="text-xs text-zinc-500">{comment.time}</span>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                               {comment.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                               <button className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                                  <Heart className="w-3 h-3" /> {comment.votes}
                               </button>
                               <button className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Reply</button>
                            </div>
                         </div>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies.length > 0 && (
                         <div className="mt-4 ml-4 pl-4 border-l border-zinc-200 dark:border-zinc-800 space-y-4">
                            {comment.replies.map(reply => (
                               <div key={reply.id} className="flex gap-4">
                                  <div className="mt-2">
                                     <CornerDownRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
                                  </div>
                                  <div className="flex-1 bg-zinc-50/50 dark:bg-zinc-900/30 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
                                     <div className="flex items-center gap-2 mb-1">
                                        <span className={`font-spacegrotesk font-bold text-sm ${reply.isAuthor ? "text-sky-600 dark:text-sky-400" : "text-zinc-900 dark:text-zinc-200"}`}>
                                           {reply.author}
                                        </span>
                                        {reply.isAuthor && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 uppercase tracking-wide">
                                                OP
                                            </span>
                                        )}
                                        <span className="text-xs text-zinc-500 ml-auto">{reply.time}</span>
                                     </div>
                                     <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                                        {reply.content}
                                     </p>
                                     <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                                        <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                                           <Heart className="w-3 h-3" /> {reply.votes}
                                        </button>
                                     </div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      )}
                   </div>
                 ))}
              </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar (1/4 width) */}
        <div className="space-y-6">
           
           {/* Author Stats Card */}
           <div className="
                bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
                border border-zinc-200 dark:border-zinc-800 
                rounded-2xl p-6 shadow-sm sticky top-24
            ">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 font-spacegrotesk">About Author</h3>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-lg text-white font-bold shadow-lg shadow-indigo-500/20">
                    D
                 </div>
                 <div>
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 font-spacegrotesk">dev_wizard</div>
                    <div className="text-xs text-zinc-500 font-medium">Rep: 1,542</div>
                 </div>
              </div>
              
              {/* Secondary Button Style (Matches Hero Watch Sample) */}
              <button className="
                w-full py-2.5 rounded-xl font-spacegrotesk text-sm font-medium
                flex items-center justify-center gap-2 cursor-pointer
                border border-zinc-200 dark:border-zinc-700
                bg-white/70 dark:bg-zinc-900/60
                text-zinc-700 dark:text-zinc-200
                shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
                hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)]
                hover:bg-zinc-50 dark:hover:bg-zinc-800
                active:translate-y-[1px]
                transition-all duration-200
              ">
                 Follow User
              </button>
           </div>

           {/* Related Posts */}
           <div className="
                bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
                border border-zinc-200 dark:border-zinc-800 
                rounded-2xl p-6 shadow-sm
            ">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 font-spacegrotesk">Related Posts</h3>
              <div className="space-y-5">
                 {[
                    "Google L3 Interview Questions",
                    "Dynamic Programming Patterns",
                    "System Design Primer for Beginners"
                 ].map((title, i) => (
                    <div key={i} className="group cursor-pointer">
                       <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                          {title}
                       </h4>
                       <div className="text-xs text-zinc-400 mt-1.5 flex items-center gap-2">
                          <MessageSquare className="w-3 h-3" /> 24 • 5h ago
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

export default DiscussPost;