import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle";
import { 
  ArrowLeft, 
  Code, 
  List, 
  Eye, 
  PenLine,
  Send,
  Info,
  Hash,
  Type,
  Link,
  Quote,
  ChevronDown,
  Briefcase,
  Lightbulb,
  Cpu,
  Compass,
  Check
} from "lucide-react";

// --- CUSTOM OPTIONS CONFIG ---
const CATEGORIES = [
  { id: "General", label: "General Discussion", icon: Compass, color: "text-zinc-500" },
  { id: "Interview", label: "Interview Experience", icon: Briefcase, color: "text-amber-500" },
  { id: "Solution", label: "Solution Explanation", icon: Lightbulb, color: "text-yellow-500" },
  { id: "SystemDesign", label: "System Design", icon: Cpu, color: "text-rose-500" },
  { id: "Career", label: "Career Advice", icon: Send, color: "text-sky-500" },
];

const DiscussCreate = () => {
  const navigate = useNavigate();
  
  // State for form fields
  const [activeTab, setActiveTab] = useState("write"); 
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  // --- CUSTOM DROPDOWN STATE ---
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Styles
  const labelClass = "block text-xs font-spacegrotesk font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-2.5";
  const inputClass = `
    w-full bg-zinc-100/50 dark:bg-zinc-900/50 
    border border-zinc-200 dark:border-zinc-800 
    rounded-xl px-4 py-3.5 
    focus:outline-none focus:bg-white dark:focus:bg-zinc-900
    focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500/50 
    text-zinc-900 dark:text-zinc-100 
    placeholder-zinc-400 dark:placeholder-zinc-600 
    transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
    font-rubik text-sm
  `;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !content) return alert("Please fill in title and content");
    console.log({ title, category: category.id, tags, content });
    alert("Post created! (Mock)");
    navigate("/discuss");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-rubik transition-colors duration-300 selection:bg-sky-500/30">
      
      {/* NAVBAR */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-spacegrotesk font-bold text-zinc-800 dark:text-zinc-100">
                New <span className="font-instrument italic font-normal">Discussion</span>
              </h1>
           </div>
           <div className="flex items-center gap-4">
              <Togglebtn />
              <button 
                onClick={() => navigate("/discuss")}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                Discard
              </button>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* MAIN FORM */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Title Input */}
          <div className="relative group">
             <label className={labelClass}>Discussion Title</label>
             <div className="relative">
                <input 
                    type="text"
                    className="
                        w-full bg-transparent 
                        text-2xl md:text-3xl font-spacegrotesk font-bold 
                        border-b-2 border-zinc-200 dark:border-zinc-800 
                        py-3 pr-4 pl-0
                        focus:outline-none focus:border-sky-500 
                        placeholder-zinc-300 dark:placeholder-zinc-700 
                        transition-colors text-zinc-900 dark:text-zinc-100
                    "
                    placeholder="What's on your mind?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             
             {/* --- PREMIUM DROPDOWN --- */}
             <div ref={dropdownRef} className="relative z-10">
                <label className={labelClass}>Category</label>
                
                {/* Trigger Button */}
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`
                    w-full flex items-center justify-between
                    bg-zinc-100/50 dark:bg-zinc-900/50 
                    border border-zinc-200 dark:border-zinc-800 
                    rounded-xl px-4 py-3.5
                    text-sm text-left transition-all
                    hover:bg-white dark:hover:bg-zinc-900 hover:shadow-md
                    focus:ring-2 focus:ring-sky-500/20
                    ${isDropdownOpen ? 'ring-2 ring-sky-500/20 bg-white dark:bg-zinc-900' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* Selected Icon */}
                    <div className={`p-1.5 rounded-md bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700 ${category.color}`}>
                       <category.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 font-rubik">
                      {category.label}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="
                    absolute top-full left-0 right-0 mt-2 p-1.5
                    bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl
                    border border-zinc-200 dark:border-zinc-800
                    rounded-xl shadow-xl shadow-zinc-500/10 dark:shadow-black/40
                    animate-in fade-in zoom-in-95 duration-200 origin-top
                    flex flex-col gap-1
                  ">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`
                          flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-all
                          ${category.id === cat.id 
                            ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                           <cat.icon className={`w-4 h-4 ${category.id === cat.id ? 'text-sky-500' : 'text-zinc-400'}`} />
                           <span className="font-medium">{cat.label}</span>
                        </div>
                        {category.id === cat.id && <Check className="w-4 h-4 text-sky-500" />}
                      </button>
                    ))}
                  </div>
                )}
             </div>

             {/* Tags Input */}
             <div>
                <label className={labelClass}>Tags</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                        <Hash className="w-4 h-4" />
                    </div>
                    <input 
                        type="text"
                        className={`${inputClass} pl-10`}
                        placeholder="e.g. java, dp, google"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
             </div>
          </div>

          {/* EDITOR SECTION */}
          <div className="pt-2">
             <div className="flex items-center justify-between mb-3">
                 <label className={labelClass + " mb-0"}>Content</label>
                 <div className="flex p-1 rounded-lg bg-zinc-200 dark:bg-zinc-800">
                    <button 
                       onClick={() => setActiveTab("write")}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'write' ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
                    >
                       <PenLine className="w-3.5 h-3.5" /> Write
                    </button>
                    <button 
                       onClick={() => setActiveTab("preview")}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
                    >
                       <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                 </div>
             </div>
             
             <div className="
                bg-white dark:bg-zinc-900 
                border border-zinc-200 dark:border-zinc-800 
                rounded-xl overflow-hidden shadow-sm 
                focus-within:ring-2 focus-within:ring-sky-500/20 focus-within:border-sky-500/50 
                transition-all
             ">
                {activeTab === "write" && (
                   <div className="flex flex-wrap items-center gap-1 bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800 px-3 py-2 text-zinc-500 dark:text-zinc-400">
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><strong className="font-serif font-bold text-sm">B</strong></button>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><em className="font-serif italic text-sm">I</em></button>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><Type className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 mx-1"></div>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><Code className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><Link className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><Quote className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors"><List className="w-4 h-4" /></button>
                   </div>
                )}

                <div className="min-h-[400px]">
                   {activeTab === "write" ? (
                      <textarea 
                         className="w-full h-[400px] bg-transparent p-4 focus:outline-none resize-none text-zinc-800 dark:text-zinc-200 font-mono text-sm leading-relaxed"
                         placeholder="Describe your problem, solution, or experience here... (Markdown supported)"
                         value={content}
                         onChange={(e) => setContent(e.target.value)}
                      />
                   ) : (
                      <div className="p-6 prose prose-zinc dark:prose-invert max-w-none">
                         {content ? (
                            <div className="whitespace-pre-wrap">{content}</div> 
                         ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-zinc-400 dark:text-zinc-600">
                               <Eye className="w-12 h-12 mb-4 opacity-20" />
                               <p className="font-spacegrotesk text-sm">Nothing to preview yet.</p>
                            </div>
                         )}
                      </div>
                   )}
                </div>
             </div>
          </div>

          <div className="flex justify-end pt-2">
             <button 
                onClick={handleSubmit}
                className="
                   font-spacegrotesk font-bold text-base
                   flex items-center gap-2 px-8 py-3 rounded-xl
                   bg-sky-500 hover:bg-sky-600
                   cursor-pointer text-white 
                   [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
                   hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
                   active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
                   active:translate-y-[1px]
                   transition-all duration-200
                "
             >
                <Send className="w-4 h-4" /> Publish Post
             </button>
          </div>

        </div>

        {/* RIGHT SIDEBAR (Unchanged Guidelines) */}
        <div className="hidden lg:block space-y-6">
           <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-amber-600 dark:text-amber-500">
                 <Info className="w-5 h-5" />
                 <h3 className="font-spacegrotesk font-bold text-sm uppercase tracking-wide">Posting Guidelines</h3>
              </div>
              <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-rubik">
                 <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500">1</span><p>Be specific and clear in your title.</p></li>
                 <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500">2</span><p>Use code blocks for code.</p></li>
                 <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500">3</span><p>Tag your post correctly.</p></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                 <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">Need formatting help? <a href="#" className="text-sky-500 hover:underline">Markdown Guide</a></p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default DiscussCreate;