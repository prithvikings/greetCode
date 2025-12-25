import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle";
import { 
  ArrowLeft, 
  X, 
  Image, 
  Link as LinkIcon, 
  Code, 
  List, 
  Heading, 
  Quote, 
  Eye, 
  PenLine,
  Send,
  Info
} from "lucide-react";

const DiscussCreate = () => {
  const navigate = useNavigate();
  
  // State for form fields
  const [activeTab, setActiveTab] = useState("write"); // 'write' or 'preview'
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  // Helper styles
  const labelClass = "block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2";
  const inputClass = "w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-600 transition-all shadow-sm";

  // Mock Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) return alert("Please fill in title and content");
    console.log({ title, category, tags, content });
    alert("Post created! (Mock)");
    navigate("/discuss");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-sans transition-colors duration-300 selection:bg-indigo-500/30">
      
      {/* NAVBAR */}
      <div className="border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-zinc-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Create New Discussion</h1>
           </div>
           <div className="flex items-center gap-4">
              <Togglebtn />
              <button 
                onClick={() => navigate("/discuss")}
                className="text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN FORM (Left Column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title Input */}
          <div>
             <input 
                type="text"
                className="w-full bg-transparent text-3xl font-bold border-b border-gray-200 dark:border-zinc-800 py-4 focus:outline-none focus:border-indigo-500 placeholder-gray-300 dark:placeholder-zinc-700 transition-colors"
                placeholder="What's on your mind?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Category Select */}
             <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                   <select 
                      className={`${inputClass} appearance-none cursor-pointer`}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                   >
                      <option>General</option>
                      <option>Interview Experience</option>
                      <option>Solution Explanation</option>
                      <option>System Design</option>
                      <option>Career Advice</option>
                   </select>
                   <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-zinc-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                   </div>
                </div>
             </div>

             {/* Tags Input */}
             <div>
                <label className={labelClass}>Tags (comma separated)</label>
                <input 
                   type="text"
                   className={inputClass}
                   placeholder="e.g. java, dp, google"
                   value={tags}
                   onChange={(e) => setTags(e.target.value)}
                />
             </div>
          </div>

          {/* EDITOR SECTION */}
          <div className="mt-8">
             <label className={labelClass}>Description</label>
             
             <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all">
                
                {/* Editor Tabs & Toolbar */}
                <div className="flex flex-wrap items-center justify-between bg-gray-50 dark:bg-zinc-950/50 border-b border-gray-200 dark:border-zinc-800 px-2 py-2">
                   
                   {/* Tabs */}
                   <div className="flex gap-1 bg-gray-200 dark:bg-zinc-900 p-1 rounded-lg">
                      <button 
                         onClick={() => setActiveTab("write")}
                         className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'write' ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'}`}
                      >
                         <PenLine className="w-3.5 h-3.5" /> Write
                      </button>
                      <button 
                         onClick={() => setActiveTab("preview")}
                         className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'}`}
                      >
                         <Eye className="w-3.5 h-3.5" /> Preview
                      </button>
                   </div>

                   {/* Formatting Tools (Only show in Write mode) */}
                   {activeTab === "write" && (
                      <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-400">
                         <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Bold"><strong className="font-serif font-bold text-sm">B</strong></button>
                         <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Italic"><em className="font-serif italic text-sm">I</em></button>
                         <div className="w-px h-4 bg-gray-300 dark:bg-zinc-700 mx-1"></div>
                         <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Code"><Code className="w-4 h-4" /></button>
                         <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors" title="Link"><LinkIcon className="w-4 h-4" /></button>
                         <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors" title="List"><List className="w-4 h-4" /></button>
                      </div>
                   )}
                </div>

                {/* Editor Content Area */}
                <div className="min-h-[400px]">
                   {activeTab === "write" ? (
                      <textarea 
                         className="w-full h-[400px] bg-transparent p-4 focus:outline-none resize-none text-gray-800 dark:text-zinc-200 font-mono text-sm leading-relaxed"
                         placeholder="Describe your problem, solution, or experience here... (Markdown supported)"
                         value={content}
                         onChange={(e) => setContent(e.target.value)}
                      />
                   ) : (
                      // PREVIEW AREA
                      <div className="p-6 prose dark:prose-invert max-w-none">
                         {content ? (
                            <div className="whitespace-pre-wrap">{content}</div> 
                            // NOTE: In real app, use <ReactMarkdown>{content}</ReactMarkdown> here
                         ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-zinc-600">
                               <Eye className="w-12 h-12 mb-4 opacity-20" />
                               <p>Nothing to preview yet.</p>
                            </div>
                         )}
                      </div>
                   )}
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-4">
             <button 
                onClick={handleSubmit}
                className="btn bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/20 transform transition-all hover:scale-105 active:scale-95"
             >
                <Send className="w-4 h-4" /> Publish Post
             </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR (Guidelines) */}
        <div className="hidden lg:block space-y-6">
           
           <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-500">
                 <Info className="w-5 h-5" />
                 <h3 className="font-bold text-sm uppercase tracking-wide">Posting Guidelines</h3>
              </div>
              
              <ul className="space-y-4 text-sm text-gray-600 dark:text-zinc-400">
                 <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">1</span>
                    <p>Be specific and clear in your title. Avoid generic titles like "Help me".</p>
                 </li>
                 <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">2</span>
                    <p>Use code blocks for code. Do not paste screenshots of code.</p>
                 </li>
                 <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">3</span>
                    <p>Tag your post correctly. Use "Interview" for experiences and "General" for discussions.</p>
                 </li>
                 <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs">4</span>
                    <p>Be respectful to others. Constructive criticism is welcome; rudeness is not.</p>
                 </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                 <p className="text-xs text-gray-400 dark:text-zinc-500 text-center">
                    Need formatting help? <a href="#" className="text-indigo-500 hover:underline">Markdown Guide</a>
                 </p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default DiscussCreate;