// src/pages/ProblemPage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import AiChat from "../components/AiChat.jsx";
import Editorial from "../components/Editorial.jsx";
import { Togglebtn } from "../components/themetoggle"; 
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";

import { 
  Play, 
  ChevronLeft, 
  RotateCcw, 
  Code2, 
  FileText, 
  List, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Terminal,
  Sparkles,
  BookOpen,
  Send,
  ChevronDown
} from "lucide-react";

const languageOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "java", label: "Java" },
  { id: "c++", label: "C++" },
];

export default function ProblemPage() {
  const { problemid } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // --- Logic State ---
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// loading starter...");
  const [runResult, setRunResult] = useState(null); 
  const [submitResult, setSubmitResult] = useState(null); 
  const [activeLeftTab, setActiveLeftTab] = useState("description"); 
  const [customInput, setCustomInput] = useState(""); 
  const [userSubmissions, setUserSubmissions] = useState([]);
  const editorRef = useRef(null);

  // --- Dropdown State (NEW) ---
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [codeMap, setCodeMap] = useState({
    javascript: "",
    java: "",
    "c++": "",
  });

  // --- Close Dropdown on Click Outside (NEW) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Fetch Logic ---
  useEffect(() => {
    if (!problemid) return;
    let mounted = true;
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/api/auth/problem/getProblemById/${problemid}`);
        if (!mounted) return;
        setProblem(res.data);
        const starter = pickStarterCode(res.data.startCode || [], selectedLanguage);
        setCode(starter ?? "// Starter code not provided for this language");
      } catch (err) {
        console.error("Fetch problem error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProblem();
    return () => { mounted = false; };
  }, [problemid]);

  useEffect(() => {
    if (!problem) return;
    const starter = pickStarterCode(problem.startCode || [], selectedLanguage);
    if (starter) setCode(starter);
  }, [problem, selectedLanguage]);

  function pickStarterCode(startCodeArray = [], lang) {
    if (!Array.isArray(startCodeArray)) return null;
    const found = startCodeArray.find((sc) => {
      if (!sc?.Language) return false;
      return String(sc.Language).toLowerCase() === lang.toLowerCase();
    });
    return found?.initialCode ?? null;
  }

  // --- Handle Language Selection (Refactored for Custom Dropdown) ---
  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    const saved = codeMap[langId];
    setCode(saved && saved.trim() !== "" ? saved : pickStarterCode(problem?.startCode || [], langId));
    if (!saved) {
        setCodeMap((prev) => ({ ...prev, [langId]: pickStarterCode(problem?.startCode || [], langId) }));
    }
    setIsLangMenuOpen(false); // Close menu
  };

  function handleEditorMount(editor) { editorRef.current = editor; }
  
  function handleEditorChange(value) {
    setCode(value);
    setCodeMap((prev) => ({ ...prev, [selectedLanguage]: value }));
  }

  async function handleRun() {
    if (!problemid) return;
    setRunResult(null); setSubmitResult(null); setLoading(true);
    try {
      const payload = { code, language: selectedLanguage };
      const res = await axiosClient.post(`/api/auth/problem/run/${problemid}`, payload);
      setRunResult(res.data.results || res.data);
    } catch (err) {
      setRunResult({ error: err.response?.data?.message || "Run failed" });
    } finally { setLoading(false); }
  }

  async function handleSubmitCode() {
    if (!problemid) return;
    setSubmitResult(null); setRunResult(null); setLoading(true);
    try {
      const payload = { code, language: selectedLanguage };
      const res = await axiosClient.post(`/api/auth/problem/submit/${problemid}`, payload);
      setSubmitResult(res.data.submission || res.data);
    } catch (err) {
      setSubmitResult({ error: err.response?.data?.message || "Submit failed" });
    } finally { setLoading(false); }
  }

  function mapStatusIdToLabel(status_id) {
    switch (status_id) {
      case 1: return "In Queue";
      case 2: return "Processing";
      case 3: return "Accepted";
      case 4: return "Runtime Error";
      case 5: return "TLE";
      default: return `Status ${status_id}`;
    }
  }

  const visibleTests = useMemo(() => problem?.visibleTestCases || [], [problem]);
  const hiddenTestsCount = useMemo(() => (problem?.hiddenTestCases || []).length, [problem]);

  // --- STYLING TOKENS ---
  const styles = {
    // Layout Colors
    bg: isDarkMode ? "bg-zinc-950" : "bg-white",
    text: isDarkMode ? "text-zinc-400" : "text-zinc-500",
    textPrimary: isDarkMode ? "text-zinc-100" : "text-zinc-900",
    border: isDarkMode ? "border-zinc-800" : "border-zinc-200",
    
    // Panel Backgrounds
    headerBg: isDarkMode ? "bg-zinc-950/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md",
    panelBg: isDarkMode ? "bg-zinc-950" : "bg-white",
    cardBg: isDarkMode ? "bg-zinc-900/40" : "bg-zinc-50/50",
    
    // Interactive Elements
    tabActive: isDarkMode ? "text-zinc-100 border-b-2 border-zinc-100 bg-zinc-900/30" : "text-zinc-900 border-b-2 border-zinc-900 bg-zinc-50",
    tabInactive: "border-transparent hover:text-zinc-600 hover:bg-zinc-500/5",
    
    // Secondary Button Style (Ghost/Outline)
    secondaryBtn: `
      font-rubik text-xs font-medium
      flex items-center justify-center gap-2
      px-3 py-1.5 corner-squircel rounded-md cursor-pointer
      border border-zinc-200 dark:border-zinc-800
      bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
      text-zinc-700 dark:text-zinc-300
      shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
      hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)]
      hover:bg-zinc-50 dark:hover:bg-zinc-800
      active:translate-y-[1px]
      transition-all duration-200
      disabled:opacity-50
    `
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveLeftTab(id);
        if (id === "submissions") {
           (async () => {
              try {
                const res = await axiosClient.get(`/api/auth/problem/submittedProblem/${problemid}`);
                setUserSubmissions(res.data.submissions || []);
              } catch (err) { setUserSubmissions([]); }
           })();
        }
      }}
      className={`
       cursor-pointer font-rubik flex items-center gap-2 px-3 py-2.5 text-xs font-medium transition-all whitespace-nowrap select-none
        ${activeLeftTab === id ? styles.tabActive : styles.tabInactive}
      `}
    >
      {Icon && <Icon size={14} className={activeLeftTab === id ? "opacity-100" : "opacity-60"} />}
      {label}
    </button>
  );

  return (
    <div className={`h-screen w-full ${styles.bg} ${styles.text} flex flex-col overflow-hidden font-lato selection:bg-sky-500/20`}>
      
      {/* HEADER */}
      <header className={`h-14 shrink-0 border-b ${styles.border} ${styles.headerBg} flex items-center justify-between px-4 z-20`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-2 rounded-md transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white' : 'hover:bg-zinc-100 text-zinc-500 hover:text-black'}`}
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex flex-col gap-1">
            <h1 className={`text-sm font-poppins font-semibold tracking-tight ${styles.textPrimary}`}>
              {problem?.title || "Problem"}
            </h1>
            <div className="flex items-center gap-2">
                {/* --- DIFFICULTY BADGE --- */}
                <span className={`
                    px-2.5 py-0.5 rounded-full text-[10px] font-rubik font-medium uppercase tracking-wide border
                    ${problem?.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 
                      problem?.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' : 
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'}
                `}>
                  {problem?.difficulty || "Easy"}
                </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <Togglebtn />
           <div className={`h-5 w-[1px] mx-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>

           {/* --- MODERN LANGUAGE DROPDOWN (Replaced Select) --- */}
           <div className="relative" ref={dropdownRef}>
             {/* TRIGGER */}
             <button
               onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
               className={`
                 ${styles.secondaryBtn}
                 w-[120px] justify-between relative
                 
               `}
             >
               <span className="truncate">{languageOptions.find(o => o.id === selectedLanguage)?.label}</span>
               <ChevronDown 
                 size={12} 
                 className={`opacity-60 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} 
               />
             </button>

             {/* DROPDOWN MENU */}
             {isLangMenuOpen && (
               <div className={`
                
                 absolute top-full right-0 mt-2 w-full min-w-[140px]
                 rounded-lg border shadow-xl z-50 overflow-hidden
                 origin-top-right animate-in fade-in zoom-in-95 duration-100
                 ${isDarkMode ? 'bg-[#09090b] border-zinc-800' : 'bg-white border-zinc-200'}
               `}>
                 <div className="p-1 flex flex-col gap-0.5">
                   {languageOptions.map((opt) => {
                     const isSelected = selectedLanguage === opt.id;
                     return (
                       <button
                         key={opt.id}
                         onClick={() => handleLanguageSelect(opt.id)}
                         className={`
                           cursor-pointer flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors font-rubik
                           ${isSelected 
                             ? (isDarkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-900') 
                             : (isDarkMode ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900')}
                         `}
                       >
                         {opt.label}
                         {isSelected && <CheckCircle2 size={12} className="text-sky-500" />}
                       </button>
                     );
                   })}
                 </div>
               </div>
             )}
           </div>

          <button onClick={handleRun} disabled={loading} className={styles.secondaryBtn}>
            <Play size={12} fill="currentColor" />
            Run
          </button>

          {/* Primary Submit Button */}
          <Button
            variant="default"
            onClick={handleSubmitCode}
            disabled={loading}
            className="
                font-rubik corner-squircel px-4 py-1.5
                bg-sky-500 hover:bg-sky-600
                cursor-pointer text-white text-xs font-medium
                [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
                active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
                active:translate-y-[1px]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60
                transition-all duration-200 flex items-center gap-2
            "
          >
            {loading ? (
                <span className="loading loading-spinner loading-xs scale-75"></span>
            ) : (
                <>
                    <span>Submit</span>
                    <Send size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </>
            )}
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className={`w-1/2 flex flex-col border-r ${styles.border} min-w-[400px]`}>
          <div className={`flex border-b ${styles.border} ${styles.panelBg} px-2 pt-1 gap-1 overflow-x-auto scrollbar-hide`}>
            <TabButton id="description" label="Description" icon={FileText} />
            <TabButton id="examples" label="Examples" icon={List} />
            <TabButton id="tests" label="Tests" icon={CheckCircle2} />
            <TabButton id="Editorial" label="Editorial" icon={BookOpen} />
            <TabButton id="Aichat" label="AI Assistant" icon={Sparkles} />
            <TabButton id="submissions" label="History" icon={Clock} />
          </div>

          <div className={`flex-1 overflow-y-auto p-6 ${styles.panelBg} custom-scrollbar`}>
            {/* TABS CONTENT */}
            {activeLeftTab === "description" && (
              <div className={`prose ${isDarkMode ? 'prose-invert' : ''} prose-sm max-w-none prose-headings:font-poppins prose-p:font-lato prose-p:text-zinc-500 dark:prose-p:text-zinc-400`}>
                 <div style={{ whiteSpace: "pre-wrap" }}>{problem?.description}</div>
              </div>
            )}

            {activeLeftTab === "examples" && (
              <div className="space-y-6">
                <h3 className={`text-sm font-poppins font-medium flex items-center gap-2 ${styles.textPrimary}`}>
                  <Terminal size={14} className="text-sky-500" /> Visible Test Cases
                </h3>
                {visibleTests.map((t, idx) => (
                  <div key={idx} className={`rounded-lg border ${styles.border} ${styles.cardBg} overflow-hidden`}>
                    <div className={`px-3 py-1.5 border-b ${styles.border} text-[10px] font-rubik uppercase tracking-wider opacity-60`}>
                      Case {idx + 1}
                    </div>
                    <div className="p-4 space-y-3 text-xs font-mono">
                      <div>
                        <div className="text-[10px] opacity-40 mb-1 font-rubik uppercase tracking-wider">Input</div>
                        <div className={`p-2 rounded-md ${isDarkMode ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>{t.input}</div>
                      </div>
                      <div>
                        <div className="text-[10px] opacity-40 mb-1 font-rubik uppercase tracking-wider">Output</div>
                        <div className={`p-2 rounded-md ${isDarkMode ? 'bg-zinc-950 border border-zinc-800' : 'bg-white border border-zinc-200'}`}>{t.output}</div>
                      </div>
                      {t.explanation && (
                          <div className="text-xs mt-2 pl-3 border-l-2 border-sky-500/30 text-zinc-500 italic font-lato">
                            {t.explanation}
                          </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeLeftTab === "tests" && (
               <div className="flex flex-col items-center justify-center h-full opacity-50 gap-4">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${styles.border} bg-gradient-to-br from-transparent to-sky-500/5`}>
                   <CheckCircle2 size={24} className="text-sky-500" />
                 </div>
                 <div className="text-center">
                   <p className="font-poppins font-medium text-sm">Hidden Test Cases</p>
                   <p className="text-xs mt-1 font-rubik">{hiddenTestsCount} hidden tests</p>
                 </div>
               </div>
            )}

            {activeLeftTab === "Editorial" && <div className="h-full"><Editorial secureUrl={problem?.secureUrl} thumbnailUrl={problem?.thumbnailUrl} duration={problem?.duration}/></div>}
            {activeLeftTab === "Aichat" && <AiChat problem={problem} />}

            {activeLeftTab === "submissions" && (
              <div className="space-y-4">
                <h3 className={`font-poppins font-medium text-sm ${styles.textPrimary}`}>Submission History</h3>
                {userSubmissions.length === 0 ? (
                  <div className={`text-center py-12 border border-dashed rounded-lg ${styles.border}`}>
                    <p className="opacity-50 text-xs font-rubik">No submission history found.</p>
                  </div>
                ) : (
                  <div className={`rounded-lg border ${styles.border} overflow-hidden`}>
                    <table className="w-full text-xs text-left">
                      <thead className={`${isDarkMode ? 'bg-zinc-900/50' : 'bg-zinc-50'} font-medium border-b ${styles.border} font-rubik`}>
                        <tr>
                          <th className="px-4 py-2 opacity-60 font-normal">Status</th>
                          <th className="px-4 py-2 opacity-60 font-normal">Language</th>
                          <th className="px-4 py-2 opacity-60 font-normal">Runtime</th>
                          <th className="px-4 py-2 opacity-60 font-normal">Date</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? 'divide-zinc-800' : 'divide-zinc-100'}`}>
                        {userSubmissions.map((sub, idx) => (
                          <tr key={idx} className={`group ${isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-50'} transition-colors`}>
                            <td className="px-4 py-2.5">
                              {/* STATUS BADGE IN HISTORY */}
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-rubik font-medium border
                                ${sub.status === 'Accepted' 
                                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                                    : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 font-mono opacity-80">{sub.language}</td>
                            <td className="px-4 py-2.5 font-mono opacity-80">{sub.runtime} ms</td>
                            <td className="px-4 py-2.5 opacity-50 font-lato">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`w-1/2 flex flex-col ${isDarkMode ? 'bg-[#09090b]' : 'bg-white'}`}>
          {/* Editor Header */}
          <div className={`h-8 border-b ${styles.border} ${isDarkMode ? 'bg-zinc-900/30' : 'bg-zinc-50/50'} flex items-center justify-between px-3`}>
             <div className="flex items-center gap-2 text-[10px] opacity-60 font-mono">
                <Code2 size={12} />
                <span>Solution.{selectedLanguage === 'c++' ? 'cpp' : selectedLanguage === 'javascript' ? 'js' : 'java'}</span>
             </div>
             <button
                onClick={() => {
                  const starter = pickStarterCode(problem?.startCode || [], selectedLanguage);
                  setCode(starter);
                  setCodeMap((prev) => ({ ...prev, [selectedLanguage]: starter }));
                }} 
                className="cursor-pointer flex items-center gap-1.5 text-[10px] opacity-50 hover:opacity-100 transition-opacity font-rubik"
             >
               <RotateCcw size={10} /> Reset
             </button>
          </div>

          <div className="flex-1 relative">
            <Editor
              theme={isDarkMode ? "vs-dark" : "light"}
              height="100%"
              defaultLanguage={selectedLanguage === "c++" ? "cpp" : selectedLanguage}
              language={selectedLanguage === "c++" ? "cpp" : selectedLanguage}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                fontSize: 13.5,
                lineHeight: 22,
                scrollBeyondLastLine: false,
                padding: { top: 12 },
                fontFamily: "JetBrains Mono, Menlo, monospace",
                renderLineHighlight: "none",
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
              }}
            />
          </div>

          {/* Console / Terminal */}
          <div className={`h-[35%] min-h-[150px] border-t ${styles.border} ${styles.bg} flex flex-col shadow-inner`}>
            <div className={`h-8 border-b ${styles.border} ${isDarkMode ? 'bg-zinc-900/30' : 'bg-zinc-50/50'} flex items-center px-4 justify-between`}>
              <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 opacity-60 font-rubik">
                <Terminal size={12} /> Console
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar">
              {!runResult && !submitResult && !loading && (
                <div className="h-full flex flex-col items-center justify-center opacity-30 gap-2">
                  <Terminal size={24} />
                  <p className="text-xs font-rubik">Ready to execute</p>
                </div>
              )}

              {loading && (
                  <div className="h-full flex flex-col items-center justify-center gap-3 opacity-60">
                    <span className="loading loading-spinner loading-sm text-sky-500"></span>
                    <span className="text-xs animate-pulse font-rubik">Compiling & Executing...</span>
                  </div>
              )}

              {/* Run Results */}
              {runResult && (
                <div className="space-y-4">
                   {runResult.error ? (
                     <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg text-red-500">
                       <h4 className="font-bold mb-1 flex items-center gap-2 font-rubik"><CheckCircle2 size={14} className="rotate-45"/> Runtime Error</h4>
                       <pre className="whitespace-pre-wrap opacity-80 font-mono">{String(runResult.error)}</pre>
                     </div>
                   ) : (
                     <div className="space-y-4">
                        {Array.isArray(runResult) && runResult.map((r, i) => (
                           <div key={i} className={`rounded-lg border ${styles.border} overflow-hidden`}>
                              <div className={`px-3 py-1.5 bg-zinc-500/5 flex justify-between items-center text-[10px] uppercase tracking-wider`}>
                                 <span className="opacity-60 font-rubik">Test Case {i + 1}</span>
                                 <span className={`font-bold font-rubik ${r.status_id === 3 ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {mapStatusIdToLabel(r.status_id)}
                                 </span>
                              </div>
                              <div className={`p-3 space-y-2`}>
                                 <div className="grid grid-cols-[60px_1fr] gap-2">
                                    <span className="opacity-40 font-rubik">Output</span>
                                    <div className={`${r.stdout === r.expected_output ? 'text-emerald-500' : 'text-zinc-400'}`}>
                                      {r.stdout ?? r.output ?? r.stdout_raw ?? "No output"}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                   )}
                </div>
              )}

              {/* Submit Results */}
              {submitResult && (
                <div className={`p-6 rounded-xl border flex flex-col items-center justify-center gap-4 ${submitResult.error ? 'border-red-500/20 bg-red-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
                  {submitResult.error ? (
                     <div className="text-center text-red-500">
                        <div className="font-bold mb-2 font-rubik">Submission Failed</div>
                        <pre className="text-[10px] whitespace-pre-wrap opacity-80">{String(submitResult.error)}</pre>
                     </div>
                  ) : (
                    <>
                       <div className="text-center">
                          <div className={`text-xl font-bold mb-1 font-rubik ${submitResult.status === 'Accepted' || submitResult?.submission?.status === 'Accepted' ? 'text-emerald-500' : 'text-red-500'}`}>
                             {submitResult.status ?? submitResult?.submission?.status}
                          </div>
                          <div className="opacity-50 text-[10px] uppercase tracking-widest font-rubik">
                             Passed {submitResult.testcasesPassed ?? submitResult?.submission?.testcasesPassed} / {submitResult.totalTestcases ?? submitResult?.submission?.totalTestcases} Test Cases
                          </div>
                       </div>
                       
                       <div className="flex gap-4 w-full justify-center">
                          <div className={`flex flex-col items-center justify-center p-3 rounded-lg border w-24 ${isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
                             <Clock size={14} className="opacity-40 mb-1"/>
                             <span className="font-mono font-bold text-sky-500">{submitResult.timeTaken ?? submitResult?.submission?.timeTaken}ms</span>
                          </div>
                          <div className={`flex flex-col items-center justify-center p-3 rounded-lg border w-24 ${isDarkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
                             <Cpu size={14} className="opacity-40 mb-1"/>
                             <span className="font-mono font-bold text-sky-500">{submitResult.memory ?? submitResult?.submission?.memory ?? "-"}KB</span>
                          </div>
                       </div>
                    </>
                  )}
                </div>
              )}
            </div>
            
            <div className={`p-2 border-t ${styles.border} ${isDarkMode ? 'bg-zinc-900/30' : 'bg-zinc-50/50'}`}>
              <div className="relative">
                <div className="absolute left-3 top-2.5 opacity-30">
                    <Terminal size={12} />
                </div>
                <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Type custom input here..."
                    className={`w-full h-9 pl-8 border rounded-lg py-2 text-xs resize-none focus:h-20 focus:outline-none transition-all placeholder:text-zinc-500 font-mono shadow-sm
                      ${isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300 focus:border-zinc-700' : 'bg-white border-zinc-200 text-gray-800 focus:border-zinc-300'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}