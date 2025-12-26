// src/pages/AdminUpdate.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { 
  Pencil, 
  ArrowLeft, 
  Search, 
  Loader2, 
  FileQuestion, 
  ListFilter 
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle"; // Import toggle

const AdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all problems (Logic Unchanged)
  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/api/auth/problem/getAllProblem");
      setProblems(res.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // Helper for visual badge colors (Purely cosmetic)
  const getDifficultyColor = (diff) => {
    const d = diff?.toLowerCase();
    if (d === "easy") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20";
    if (d === "medium") return "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
    if (d === "hard") return "bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20";
    return "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6 md:p-12 font-sans selection:bg-amber-500/30 transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <ListFilter className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
              Update Problems
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2 ml-1">Select a problem from the list below to edit details.</p>
          </div>

          <div className="flex items-center gap-3">
              <Togglebtn />
              <NavLink 
                to="/admin" 
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 transition-all text-sm font-medium text-gray-700 dark:text-zinc-300 shadow-sm group"
              >
                <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:-translate-x-1 transition-transform" /> 
                Back to Dashboard
              </NavLink>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800/50 rounded-2xl p-6 min-h-[400px] shadow-sm">
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500 dark:text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              <p>Fetching problem list...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && problems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500 dark:text-zinc-500">
              <div className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-zinc-800">
                <FileQuestion className="w-8 h-8 opacity-50" />
              </div>
              <p>No problems found in the database.</p>
            </div>
          )}

          {/* Problem List */}
          {!loading && problems.length > 0 && (
            <div className="space-y-3">
              {/* Optional Visual Label */}
              <div className="flex justify-between text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider px-4 pb-2">
                <span>Problem Name</span>
                <span className="hidden sm:block">Action</span>
              </div>

              {problems.map((problem) => (
                <div
                  key={problem._id}
                  className="group flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/80 transition-all duration-200 gap-4 shadow-sm hover:shadow-md"
                >
                  {/* Left Side: Title & Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="h-10 w-10 rounded-lg bg-white dark:bg-zinc-950 flex items-center justify-center border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 font-mono text-sm shadow-sm">
                      {problem.title.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-white transition-colors">
                        {problem.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        {/* If you had an ID or Date, you could put it here */}
                        <span className="text-xs text-gray-400 dark:text-zinc-500 hidden sm:inline-block">ID: {problem._id.slice(-6)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Action Button */}
                  <button
                    className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white font-medium transition-all duration-200 shadow-sm hover:shadow-amber-500/20"
                    onClick={() => navigate(`/admin/update/${problem._id}`)}
                  >
                    <Pencil size={16} /> 
                    <span>Edit Problem</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        {!loading && problems.length > 0 && (
          <p className="text-center text-gray-500 dark:text-zinc-600 text-sm mt-6">
            Showing all {problems.length} problems available for modification.
          </p>
        )}

      </div>
    </div>
  );
};

export default AdminUpdate;
