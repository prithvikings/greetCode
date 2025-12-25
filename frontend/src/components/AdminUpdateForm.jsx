// src/pages/AdminUpdateForm.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Togglebtn } from "../components/themetoggle"; // Import Toggle
import { 
  ArrowLeft, 
  Save, 
  Code2, 
  BookOpen, 
  FileEdit, 
  Loader2,
  Tag,
  AlignLeft
} from "lucide-react";

const languages = ["javascript", "java", "c++"];

const AdminUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedCodeTab, setSelectedCodeTab] = useState("javascript");
  const [selectedRefTab, setSelectedRefTab] = useState("javascript");

  const [startCodes, setStartCodes] = useState({
    javascript: "",
    java: "",
    "c++": "",
  });

  const [refCodes, setRefCodes] = useState({
    javascript: "",
    java: "",
    "c++": "",
  });

  // Fetch problem (LOGIC UNCHANGED)
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(
          `/api/auth/problem/getProblemById/${id}`
        );

        const pb = res.data;
        setProblem(pb);

        // START CODE MAP
        const startMap = { javascript: "", java: "", "c++": "" };
        pb.startCode.forEach((x) => {
          const lang = x.Language.toLowerCase();
          startMap[lang] = x.initialCode || "";
        });
        setStartCodes(startMap);

        // REF SOLUTION MAP
        const refMap = { javascript: "", java: "", "c++": "" };
        pb.referenceSolution.forEach((x) => {
          const lang = x.Language.toLowerCase();
          refMap[lang] = x.solutionCode || "";
        });
        setRefCodes(refMap);
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleUpdate = async () => {
    try {
      // Build updated payload (LOGIC UNCHANGED)
      const payload = {
        ...problem,
        startCode: languages.map((lang) => ({
          Language: lang,
          initialCode: startCodes[lang] || "",
        })),
        referenceSolution: languages.map((lang) => ({
          Language: lang,
          solutionCode: refCodes[lang] || "",
        })),
      };

      const res = await axiosClient.patch(
        `/api/auth/problem/update/${id}`,
        payload
      );

      alert("Problem updated successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // --- STYLES (UPDATED FOR LIGHT/DARK) ---
  const inputClass = "w-full bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 placeholder-gray-400 dark:placeholder-zinc-600 transition-all";
  const labelClass = "block text-sm font-medium text-gray-600 dark:text-zinc-400 mb-1.5 flex items-center gap-2";
  const cardClass = "bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 md:p-8 backdrop-blur-sm shadow-sm";
  
  const tabBtnClass = (active) => `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all border-b-2 
    ${active 
      ? "border-amber-500 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/5" 
      : "border-transparent text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800/50"
    }`;

  // --- LOADING STATE ---
  if (loading || !problem) return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4 text-gray-500 dark:text-zinc-500">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
        <p>Loading problem details...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6 md:p-12 font-sans selection:bg-amber-500/30 transition-colors duration-300">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
             <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
               <FileEdit className="w-6 h-6 text-amber-600 dark:text-amber-500" />
             </div>
             Edit Problem
           </h1>
           <p className="text-gray-500 dark:text-zinc-400 mt-2 ml-1">Modify the details and code templates for <span className="text-gray-900 dark:text-zinc-200 font-semibold">{problem.title}</span>.</p>
        </div>
        
        {/* Actions Area with Toggle */}
        <div className="flex items-center gap-3">
            <Togglebtn />
            <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 transition-all text-sm font-medium text-gray-700 dark:text-zinc-300 shadow-sm"
            >
            <ArrowLeft className="w-4 h-4" /> Cancel & Back
            </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* BASIC DETAILS CARD */}
        <div className={cardClass}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Basic Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TITLE */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Problem Title</label>
                    <input
                        className={inputClass}
                        value={problem.title}
                        onChange={(e) => setProblem((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Reverse Linked List"
                    />
                </div>

                {/* DIFFICULTY */}
                <div>
                    <label className={labelClass}>Difficulty</label>
                    <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={problem.difficulty}
                        onChange={(e) => setProblem((prev) => ({ ...prev, difficulty: e.target.value }))}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>

                {/* TAGS */}
                <div>
                    <label className={labelClass}><Tag className="w-4 h-4" /> Tags (comma separated)</label>
                    <input
                        className={inputClass}
                        value={problem.tags.join(", ")}
                        onChange={(e) =>
                        setProblem((prev) => ({
                            ...prev,
                            tags: e.target.value.split(",").map((x) => x.trim()),
                        }))
                        }
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="md:col-span-2">
                    <label className={labelClass}><AlignLeft className="w-4 h-4" /> Description</label>
                    <textarea
                        className={`${inputClass} min-h-[150px] font-sans leading-relaxed`}
                        rows={6}
                        value={problem.description}
                        onChange={(e) => setProblem((prev) => ({ ...prev, description: e.target.value }))}
                    />
                </div>
            </div>
        </div>

        {/* STARTER CODE SECTION */}
        <div className={cardClass}>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 mb-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 py-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Starter Code
                </h2>
                <div className="flex gap-1">
                    {languages.map((lang) => (
                        <button
                        key={lang}
                        className={tabBtnClass(selectedCodeTab === lang)}
                        onClick={() => setSelectedCodeTab(lang)}
                        >
                        {lang === 'c++' ? 'C++' : lang === 'javascript' ? 'JS' : 'Java'}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="pt-4">
                <div className="border border-gray-300 dark:border-zinc-800 rounded-lg overflow-hidden">
                    <Editor
                        theme="vs-dark"
                        height="300px"
                        language={selectedCodeTab === "c++" ? "cpp" : selectedCodeTab}
                        value={startCodes[selectedCodeTab]}
                        onChange={(val) =>
                        setStartCodes((prev) => ({
                            ...prev,
                            [selectedCodeTab]: val,
                        }))
                        }
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 }
                        }}
                    />
                </div>
            </div>
        </div>

        {/* REFERENCE SOLUTION SECTION */}
        <div className={cardClass}>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 mb-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 py-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-500" /> Reference Solutions
                </h2>
                <div className="flex gap-1">
                    {languages.map((lang) => (
                        <button
                        key={lang}
                        className={tabBtnClass(selectedRefTab === lang)}
                        onClick={() => setSelectedRefTab(lang)}
                        >
                        {lang === 'c++' ? 'C++' : lang === 'javascript' ? 'JS' : 'Java'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-4">
                <div className="border border-gray-300 dark:border-zinc-800 rounded-lg overflow-hidden">
                    <Editor
                        theme="vs-dark"
                        height="300px"
                        language={selectedRefTab === "c++" ? "cpp" : selectedRefTab}
                        value={refCodes[selectedRefTab]}
                        onChange={(val) =>
                        setRefCodes((prev) => ({
                            ...prev,
                            [selectedRefTab]: val,
                        }))
                        }
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            padding: { top: 16 }
                        }}
                    />
                </div>
            </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end pt-4 pb-12">
            <button 
                onClick={handleUpdate}
                className="btn border-none shadow-xl bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                Save Changes
            </button>
        </div>

      </div>
    </div>
  );
};

export default AdminUpdateForm;