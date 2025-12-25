import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle";
import { 
  ArrowLeft, 
  MessageSquare, 
  Heart, 
  Share2, 
  Flag, 
  MoreHorizontal,
  Clock,
  Eye,
  CornerDownRight,
  ThumbsUp,
  ThumbsDown,
  Copy
} from "lucide-react";

// --- MOCK DATA ---
const POST_DATA = {
  id: 1,
  title: "Google L4 Interview Experience - 2024 (Offer Accepted)",
  author: "dev_wizard",
  authorRep: 1542,
  time: "2 hours ago",
  views: "12k",
  upvotes: 452,
  tags: ["Interview Experience", "Google", "Hard", "System Design"],
  content: `
    <p class="mb-4">I recently interviewed for the L4 position at Google. Here is the breakdown of the rounds:</p>
    
    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-zinc-100">Round 1: DSA (45 mins)</h3>
    <p class="mb-4">The question was a variation of <strong>Merge Intervals</strong>. I used a sorting approach.</p>
    
    <div class="bg-gray-800 dark:bg-zinc-900 rounded-lg p-4 mb-6 border border-gray-700 dark:border-zinc-800 overflow-x-auto">
      <code class="text-sm font-mono text-emerald-400">
        // Time Complexity: O(N log N)<br/>
        function merge(intervals) {<br/>
        &nbsp;&nbsp;if (!intervals.length) return [];<br/>
        &nbsp;&nbsp;intervals.sort((a, b) => a[0] - b[0]);<br/>
        &nbsp;&nbsp;const result = [intervals[0]];<br/>
        &nbsp;&nbsp;// ... rest of code<br/>
        }
      </code>
    </div>

    <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-zinc-100">Round 2: System Design</h3>
    <p class="mb-4">Design a URL Shortener like Bit.ly. Focused heavily on database schema and collision handling.</p>
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
  const { id } = useParams(); // In real app, fetch data using this ID
  const [commentText, setCommentText] = useState("");

  // Reusable Badge Component
  const TagBadge = ({ label }) => (
    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/20 transition-all cursor-pointer">
      #{label}
    </span>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300">
      
      {/* NAVBAR */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="hidden md:block h-6 w-px bg-gray-200 dark:bg-zinc-800"></div>
              <span className="hidden md:block font-medium text-sm text-gray-500 dark:text-zinc-400">Post #{id || 1}</span>
           </div>
           
           <div className="flex items-center gap-3">
              <Togglebtn />
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-sm">
                 <MessageSquare className="w-4 h-4" /> Reply
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: Main Content (3/4 width) */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* POST CARD */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shadow-sm">
            
            {/* Post Header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                 {POST_DATA.tags.map(tag => <TagBadge key={tag} label={tag} />)}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                {POST_DATA.title}
              </h1>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-zinc-800">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                       {POST_DATA.author[0].toUpperCase()}
                    </div>
                    <div>
                       <div className="font-semibold text-sm text-gray-900 dark:text-zinc-200">{POST_DATA.author}</div>
                       <div className="text-xs text-gray-500 dark:text-zinc-500 flex items-center gap-2">
                          <span>{POST_DATA.time}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {POST_DATA.views}</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors">
                       <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors">
                       <MoreHorizontal className="w-5 h-5" />
                    </button>
                 </div>
              </div>
            </div>

            {/* Post Body (Simulated Markdown) */}
            <div 
              className="prose dark:prose-invert max-w-none text-gray-600 dark:text-zinc-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: POST_DATA.content }}
            />

            {/* Post Footer / Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-4">
               <div className="flex items-center bg-gray-100 dark:bg-zinc-950 rounded-lg border border-gray-200 dark:border-zinc-800">
                  <button className="p-2 px-3 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-l-lg text-emerald-600 dark:text-emerald-500 transition-colors flex items-center gap-1">
                     <ThumbsUp className="w-4 h-4" /> <span className="font-bold">{POST_DATA.upvotes}</span>
                  </button>
                  <div className="w-px h-6 bg-gray-200 dark:bg-zinc-800"></div>
                  <button className="p-2 px-3 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-r-lg text-gray-500 dark:text-zinc-500 transition-colors">
                     <ThumbsDown className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>

          {/* COMMENT SECTION */}
          <div className="space-y-6">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
               Comments <span className="text-sm font-normal text-gray-500 dark:text-zinc-500">(24)</span>
             </h3>

             {/* Comment Input */}
             <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-zinc-200 placeholder-gray-400 dark:placeholder-zinc-600 resize-none min-h-[100px]"
                  placeholder="What are your thoughts? (Markdown supported)"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                   <div className="text-xs text-gray-400 dark:text-zinc-600 flex gap-2">
                      <button className="hover:text-gray-600 dark:hover:text-zinc-400">Bold</button>
                      <button className="hover:text-gray-600 dark:hover:text-zinc-400">Italic</button>
                      <button className="hover:text-gray-600 dark:hover:text-zinc-400">Code</button>
                   </div>
                   <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                      Comment
                   </button>
                </div>
             </div>

             {/* Comments List */}
             <div className="space-y-6">
                {COMMENTS.map((comment) => (
                  <div key={comment.id} className="animate-in fade-in duration-500">
                     {/* Parent Comment */}
                     <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex-shrink-0"></div>
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900 dark:text-zinc-200">{comment.author}</span>
                              <span className="text-xs text-gray-500 dark:text-zinc-500">{comment.time}</span>
                           </div>
                           <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed mb-2">
                              {comment.content}
                           </p>
                           <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-500">
                              <button className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-zinc-300">
                                 <Heart className="w-3 h-3" /> {comment.votes}
                              </button>
                              <button className="font-medium hover:text-gray-900 dark:hover:text-zinc-300">Reply</button>
                           </div>
                        </div>
                     </div>

                     {/* Nested Replies */}
                     {comment.replies.length > 0 && (
                        <div className="mt-4 ml-8 pl-4 border-l-2 border-gray-200 dark:border-zinc-800 space-y-4">
                           {comment.replies.map(reply => (
                              <div key={reply.id} className="flex gap-4">
                                 <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                                    {reply.isAuthor && "OP"}
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                       <span className={`font-semibold text-sm ${reply.isAuthor ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-zinc-200"}`}>
                                          {reply.author}
                                       </span>
                                       <span className="text-xs text-gray-500 dark:text-zinc-500">{reply.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed mb-2">
                                       {reply.content}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-zinc-500">
                                       <button className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-zinc-300">
                                          <Heart className="w-3 h-3" /> {reply.votes}
                                       </button>
                                       <button className="font-medium hover:text-gray-900 dark:hover:text-zinc-300">Reply</button>
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
           <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm sticky top-24">
              <h3 className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-4">About Author</h3>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-lg text-indigo-600 dark:text-indigo-400 font-bold">
                    D
                 </div>
                 <div>
                    <div className="font-bold text-gray-900 dark:text-zinc-100">dev_wizard</div>
                    <div className="text-xs text-gray-500 dark:text-zinc-500">Reputation: 1,542</div>
                 </div>
              </div>
              <button className="w-full py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                 Follow User
              </button>
           </div>

           {/* Related Posts */}
           <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-4">Related Posts</h3>
              <div className="space-y-4">
                 {[
                    "Google L3 Interview Questions",
                    "Dynamic Programming Patterns",
                    "System Design Primer for Beginners"
                 ].map((title, i) => (
                    <div key={i} className="group cursor-pointer">
                       <h4 className="text-sm font-medium text-gray-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                          {title}
                       </h4>
                       <div className="text-xs text-gray-400 dark:text-zinc-600 mt-1">
                          24 comments • 5h ago
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