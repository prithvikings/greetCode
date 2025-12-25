// src/pages/ProblemPage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import AiChat from "../components/AiChat.jsx";
import Editorial from "../components/Editorial.jsx";
import { Togglebtn } from "../components/themetoggle";

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
  Moon,
  Sun
} from "lucide-react";

const languageOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "java", label: "Java" },
  { id: "c++", label: "C++" },
];

export default function ProblemPage() {
  const { problemid } = useParams();
  const navigate = useNavigate();

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

  // --- THEME STATE ---
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [codeMap, setCodeMap] = useState({
    javascript: "",
    java: "",
    "c++": "",
  });

  // --- Fetch problem ---
  useEffect(() => {
    if (!problemid) return;
    let mounted = true;
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(
          `/api/auth/problem/getProblemById/${problemid}`
        );

        if (!mounted) return;
        setProblem(res.data);
        const starter = pickStarterCode(
          res.data.startCode || [],
          selectedLanguage
        );
        setCode(starter ?? "// Starter code not provided for this language");
      } catch (err) {
        console.error("Fetch problem error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProblem();
    return () => {
      mounted = false;
    };
  }, [problemid]);

  // --- Update starter code on language change ---
  useEffect(() => {
    if (!problem) return;
    const starter = pickStarterCode(problem.startCode || [], selectedLanguage);
    if (starter) setCode(starter);
  }, [problem, selectedLanguage]);

  function pickStarterCode(startCodeArray = [], lang) {
    if (!Array.isArray(startCodeArray)) return null;
    const found = startCodeArray.find((sc) => {
      if (!sc?.Language) return false;
      const normalized = String(sc.Language).toLowerCase();
      const target = lang.toLowerCase();
      return normalized === target;
    });
    return found?.initialCode ?? null;
  }

  function handleEditorMount(editor) {
    editorRef.current = editor;
  }

  function handleEditorChange(value) {
    setCode(value);
    setCodeMap((prev) => ({
      ...prev,
      [selectedLanguage]: value,
    }));
  }

  async function handleRun() {
    if (!problemid) return;
    setRunResult(null);
    setSubmitResult(null);
    try {
      setLoading(true);
      const payload = { code, language: selectedLanguage };
      const res = await axiosClient.post(`/api/auth/problem/run/${problemid}`, payload);
      setRunResult(res.data.results || res.data);
    } catch (err) {
      setRunResult({ error: err.response?.data?.message || "Run failed" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitCode() {
    if (!problemid) return;
    setSubmitResult(null);
    setRunResult(null);
    try {
      setLoading(true);
      const payload = { code, language: selectedLanguage };
      const res = await axiosClient.post(`/api/auth/problem/submit/${problemid}`, payload);
      setSubmitResult(res.data.submission || res.data);
    } catch (err) {
      setSubmitResult({ error: err.response?.data?.message || "Submit failed" });
    } finally {
      setLoading(false);
    }
  }

  function mapStatusIdToLabel(status_id) {
    switch (status_id) {
      case 1: return "In Queue";
      case 2: return "Processing";
      case 3: return "Accepted";
      case 4: return "Runtime/Error";
      case 5: return "Time Limit Exceeded";
      default: return `Status ${status_id}`;
    }
  }

  const visibleTests = useMemo(() => problem?.visibleTestCases || [], [problem]);
  const hiddenTestsCount = useMemo(() => (problem?.hiddenTestCases || []).length, [problem]);

  // --- Dynamic Theme Colors ---
  const colors = isDarkMode ? {
    bg: "bg-zinc-950",
    text: "text-zinc-300",
    border: "border-zinc-800",
    headerBg: "bg-zinc-950",
    panelBg: "bg-zinc-950/50",
    cardBg: "bg-zinc-900/50",
    editorBg: "#1e1e1e",
    tabActive: "border-sky-500 text-zinc-100 bg-zinc-900",
    tabInactive: "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50",
    inputBg: "bg-zinc-950",
    consoleHeader: "bg-zinc-900"
  } : {
    bg: "bg-white",
    text: "text-zinc-600",
    border: "border-zinc-200",
    headerBg: "bg-white",
    panelBg: "bg-white",
    cardBg: "bg-zinc-50",
    editorBg: "#ffffff",
    tabActive: "border-blue-500 text-blue-600 bg-blue-50",
    tabInactive: "border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50",
    inputBg: "bg-white",
    consoleHeader: "bg-zinc-50"
  };

  if (loading && !problem) return (
    <div className={`min-h-screen ${colors.bg} flex items-center justify-center`}>
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveLeftTab(id);
        if (id === "submissions") {
           (async () => {
              try {
                const res = await axiosClient.get(`/api/auth/problem/submittedProblem/${problemid}`);
                setUserSubmissions(res.data.submissions || []);
              } catch (err) {
                console.error("Cannot fetch submissions:", err);
                setUserSubmissions([]);
              }
           })();
        }
      }}
      className={`
        flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer
        ${activeLeftTab === id ? colors.tabActive : colors.tabInactive}
      `}
    >
      {Icon && <Icon size={14} />}
      {label}
    </button>
  );

  return (
    <div className={`h-screen w-full ${colors.bg} ${colors.text} flex flex-col overflow-hidden font-sans transition-colors duration-200`}>
      
      {/* 1. HEADER */}
      <header className={`h-14 shrink-0 border-b ${colors.border} ${colors.headerBg} flex items-center px-4 justify-between z-10`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-1.5 rounded-md transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-zinc-100 text-zinc-600'}`}
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className={`font-semibold truncate max-w-[300px] ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {problem?.title || "Problem"}
            </h1>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border 
              ${problem?.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                problem?.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
              {problem?.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {/* THEME TOGGLE BUTTON */}
           <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`cursor-pointer p-2 rounded-md transition-colors ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-yellow-400' : 'bg-zinc-100 hover:bg-zinc-200 text-indigo-500'}`}
           >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
           </button>
           <div className={`h-4 w-[1px] ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>

           <select 
             value={selectedLanguage}
             onChange={(e) => {
               const lang = e.target.value;
               setSelectedLanguage(lang);
               const saved = codeMap[lang];
               if (saved && saved.trim() !== "") {
                 setCode(saved);
               } else {
                 const starter = pickStarterCode(problem?.startCode || [], lang);
                 setCode(starter);
                 setCodeMap((prev) => ({ ...prev, [lang]: starter }));
               }
             }}
             className={`text-xs rounded px-2 py-1.5 outline-none border cursor-pointer
                ${isDarkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}
           >
             {languageOptions.map(opt => (
               <option key={opt.id} value={opt.id}>{opt.label}</option>
             ))}
           </select>

          <button 
            onClick={handleRun}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded transition-colors disabled:opacity-50
              ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'}`}
          >
            <Play size={14} fill="currentColor" />
            Run
          </button>
          <button 
            onClick={handleSubmitCode}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded transition-colors shadow-lg shadow-green-900/20 disabled:opacity-50"
          >
            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
          </button>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL */}
        <div className={`w-1/2 flex flex-col border-r ${colors.border} min-w-[400px]`}>
          <div className={`flex ${colors.headerBg} border-b ${colors.border} overflow-x-auto scrollbar-hide`}>
            <TabButton id="description" label="Description" icon={FileText} />
            <TabButton id="examples" label="Examples" icon={List} />
            <TabButton id="tests" label="Tests" icon={CheckCircle2} />
            <TabButton id="Editorial" label="Editorial" icon={BookOpen} />
            <TabButton id="Aichat" label="AI Assistant" icon={Sparkles} />
            <TabButton id="submissions" label="Submissions" icon={Clock} />
          </div>

          <div className={`flex-1 overflow-y-auto p-6 ${colors.panelBg} custom-scrollbar`}>
            
            {activeLeftTab === "description" && (
              <div className={`prose ${isDarkMode ? 'prose-invert' : ''} prose-sm max-w-none`}>
                 <div style={{ whiteSpace: "pre-wrap" }}>{problem?.description}</div>
              </div>
            )}

            {activeLeftTab === "examples" && (
              <div className="space-y-6">
                <h3 className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  <Terminal size={16} /> Visible Test Cases
                </h3>
                {visibleTests.map((t, idx) => (
                  <div key={idx} className={`rounded-lg border ${colors.border} ${colors.cardBg} overflow-hidden`}>
                    <div className={`px-4 py-2 border-b ${colors.border} text-xs font-medium opacity-70`}>
                      Example {idx + 1}
                    </div>
                    <div className="p-4 space-y-3 text-sm font-mono">
                      <div>
                        <div className="text-xs opacity-50 mb-1 font-sans">Input</div>
                        <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-zinc-700 border border-zinc-200'}`}>{t.input}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-50 mb-1 font-sans">Output</div>
                        <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-zinc-700 border border-zinc-200'}`}>{t.output}</div>
                      </div>
                      {t.explanation && (
                         <div className={`text-xs italic mt-2 border-l-2 pl-3 ${isDarkMode ? 'border-zinc-700 text-zinc-400' : 'border-zinc-300 text-zinc-500'}`}>
                           {t.explanation}
                         </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "tests" && (
               <div className="flex flex-col items-center justify-center h-full opacity-60 gap-4">
                 <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                   <CheckCircle2 size={32} />
                 </div>
                 <div className="text-center">
                   <p className="font-medium">Hidden Test Cases</p>
                   <p className="text-sm mt-1">{hiddenTestsCount} hidden tests available</p>
                 </div>
               </div>
            )}

            {activeLeftTab === "Editorial" && (
               <div className="h-full">
                 <Editorial 
                    secureUrl={problem.secureUrl}
                    thumbnailUrl={problem.thumbnailUrl}
                    duration={problem.duration}
                 />
               </div>
            )}

            {activeLeftTab === "Aichat" && <AiChat problem={problem} />}

            {activeLeftTab === "submissions" && (
              <div className="space-y-4">
                <h3 className={`font-bold ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Submission History</h3>
                {userSubmissions.length === 0 ? (
                  <div className={`text-center py-12 border border-dashed rounded-lg ${colors.border}`}>
                    <p className="opacity-50">No submissions yet.</p>
                  </div>
                ) : (
                  <div className={`rounded-lg border ${colors.border} overflow-hidden`}>
                    <table className="w-full text-sm text-left">
                      <thead className={`${colors.consoleHeader} font-medium border-b ${colors.border}`}>
                        <tr>
                          <th className="px-4 py-3 opacity-70">Status</th>
                          <th className="px-4 py-3 opacity-70">Lang</th>
                          <th className="px-4 py-3 opacity-70">Runtime</th>
                          <th className="px-4 py-3 opacity-70">Date</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDarkMode ? 'divide-zinc-800' : 'divide-zinc-200'}`}>
                        {userSubmissions.map((sub, idx) => (
                          <tr key={idx} className={`${isDarkMode ? 'hover:bg-zinc-900/50' : 'hover:bg-zinc-50'}`}>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                ${sub.status === 'Accepted' ? 'bg-green-500/10 text-green-500' : 
                                  'bg-red-500/10 text-red-500'}`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 opacity-80">{sub.language}</td>
                            <td className="px-4 py-3 opacity-80">{sub.runtime} ms</td>
                            <td className="px-4 py-3 opacity-60 text-xs">
                              {new Date(sub.submittedAt).toLocaleDateString()}
                            </td>
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
        <div className={`w-1/2 flex flex-col ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
          <div className={`h-9 border-b ${colors.border} ${colors.consoleHeader} flex items-center justify-between px-3`}>
             <div className="flex items-center gap-2 text-xs opacity-60">
                <Code2 size={14} />
                <span>Solution.{selectedLanguage === 'c++' ? 'cpp' : selectedLanguage === 'javascript' ? 'js' : 'java'}</span>
             </div>
             <button
                onClick={() => {
                  const starter = pickStarterCode(problem?.startCode || [], selectedLanguage);
                  setCode(starter);
                  setCodeMap((prev) => ({ ...prev, [selectedLanguage]: starter }));
                }} 
                className="flex items-center gap-1.5 text-xs opacity-60 hover:opacity-100 transition-colors"
             >
               <RotateCcw size={12} /> Reset
             </button>
          </div>

          <div className="flex-1 relative">
            <Editor
              theme={isDarkMode ? "vs-dark" : "light"}
              height="100%"
              defaultLanguage={selectedLanguage === "c++" ? "cpp" : selectedLanguage}
              language={selectedLanguage === "c++" ? "cpp" : selectedLanguage}
              value={code}
              onChange={(val) => handleEditorChange(val)}
              onMount={(editor) => handleEditorMount(editor)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                fontFamily: "JetBrains Mono, Menlo, monospace"
              }}
            />
          </div>

          {/* Console */}
          <div className={`h-1/3 min-h-[200px] border-t ${colors.border} ${colors.bg} flex flex-col`}>
            <div className={`h-9 border-b ${colors.border} ${colors.consoleHeader} flex items-center px-4 gap-4`}>
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 opacity-60">
                <Terminal size={12} /> Console
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm custom-scrollbar">
              {!runResult && !submitResult && !loading && (
                <div className="h-full flex flex-col items-center justify-center opacity-50">
                  <p>Run your code to see output here</p>
                </div>
              )}

              {loading && (
                 <div className="h-full flex items-center justify-center gap-3 opacity-60">
                   <span className="loading loading-spinner loading-sm"></span>
                   Running code...
                 </div>
              )}

              {runResult && (
                <div className="space-y-4">
                   {runResult.error ? (
                     <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-500">
                       <h4 className="font-bold mb-1">Error</h4>
                       <pre className="whitespace-pre-wrap text-xs">{String(runResult.error)}</pre>
                     </div>
                   ) : (
                     <div className="space-y-4">
                        {Array.isArray(runResult) && runResult.map((r, i) => (
                           <div key={i} className={`rounded border ${colors.border} overflow-hidden`}>
                              <div className={`px-3 py-1.5 ${colors.consoleHeader} flex justify-between items-center text-xs`}>
                                 <span className="font-medium opacity-80">Case {i + 1}</span>
                                 <span className={`${r.status_id === 3 ? 'text-green-500' : 'text-red-500'}`}>
                                    {mapStatusIdToLabel(r.status_id)}
                                 </span>
                              </div>
                              <div className={`p-3 space-y-2 ${colors.cardBg}`}>
                                 <div>
                                   <span className="opacity-50 text-xs block mb-1">Stdout</span>
                                   <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-950 text-zinc-300' : 'bg-white text-gray-800 border border-zinc-200'}`}>
                                     {r.stdout ?? r.output ?? r.stdout_raw ?? "No output"}
                                   </div>
                                 </div>
                                 {r.expected_output && (
                                   <div>
                                      <span className="opacity-50 text-xs block mb-1">Expected</span>
                                      <div className={`p-2 rounded ${isDarkMode ? 'bg-zinc-950 text-zinc-400' : 'bg-white text-gray-800 border border-zinc-200'}`}>
                                        {r.expected_output}
                                      </div>
                                   </div>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                   )}
                </div>
              )}

              {submitResult && (
                <div className={`p-4 rounded-lg border ${submitResult.error ? 'border-red-500/20 bg-red-500/10' : 'border-green-500/20 bg-green-500/10'}`}>
                  {submitResult.error ? (
                     <div className="text-red-500">
                        <div className="font-bold mb-2">Submission Error</div>
                        <pre className="text-xs whitespace-pre-wrap">{String(submitResult.error)}</pre>
                     </div>
                  ) : (
                    <div className="text-center">
                       <div className="text-2xl font-bold text-green-500 mb-1">
                          {submitResult.status ?? submitResult?.submission?.status}
                       </div>
                       <div className="opacity-70 text-sm mb-4">
                          Passed {submitResult.testcasesPassed ?? submitResult?.submission?.testcasesPassed} / {submitResult.totalTestcases ?? submitResult?.submission?.totalTestcases} test cases
                       </div>
                       
                       <div className="flex justify-center gap-6">
                          <div className={`flex flex-col items-center p-3 rounded-lg min-w-[100px] ${isDarkMode ? 'bg-zinc-900' : 'bg-white border'}`}>
                             <Clock size={16} className="opacity-50 mb-1"/>
                             <span className="text-lg font-mono">
                                {submitResult.timeTaken ?? submitResult?.submission?.timeTaken}ms
                             </span>
                             <span className="text-xs opacity-60">Runtime</span>
                          </div>
                          <div className={`flex flex-col items-center p-3 rounded-lg min-w-[100px] ${isDarkMode ? 'bg-zinc-900' : 'bg-white border'}`}>
                             <Cpu size={16} className="opacity-50 mb-1"/>
                             <span className="text-lg font-mono">
                                {submitResult.memory ?? submitResult?.submission?.memory ?? "N/A"}KB
                             </span>
                             <span className="text-xs opacity-60">Memory</span>
                          </div>
                       </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className={`p-2 border-t ${colors.border} ${colors.consoleHeader}`}>
              <textarea
                 value={customInput}
                 onChange={(e) => setCustomInput(e.target.value)}
                 placeholder="Custom stdin..."
                 className={`w-full h-8 border rounded px-2 py-1 text-xs resize-none focus:h-20 focus:outline-none transition-all
                   ${isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-gray-800'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}