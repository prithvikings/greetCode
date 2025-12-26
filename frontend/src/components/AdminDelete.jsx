// src/pages/AdminDelete.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { 
  Trash2, 
  ArrowLeft, 
  AlertTriangle, 
  Loader2, 
  Ban, 
  X 
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Togglebtn } from "../components/themetoggle"; // Import Toggle

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

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

  // Delete the selected problem (Logic Unchanged)
  const handleDelete = async () => {
    if (!selectedProblem) return;

    try {
      setLoading(true);
      await axiosClient.delete(
        `/api/auth/problem/delete/${selectedProblem._id}`
      );

      // Remove from UI
      setProblems((prev) =>
        prev.filter((item) => item._id !== selectedProblem._id)
      );

      setSelectedProblem(null);
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper for difficulty colors
  const getDifficultyColor = (diff) => {
    const d = diff?.toLowerCase();
    if (d === "easy") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20";
    if (d === "medium") return "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
    if (d === "hard") return "bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20";
    return "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6 md:p-12 font-sans selection:bg-rose-500/30 transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                <Trash2 className="w-6 h-6 text-rose-600 dark:text-rose-500" />
              </div>
              Delete Problems
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2 ml-1">Permanently remove problems from the platform.</p>
          </div>

          <div className="flex items-center gap-3">
              <Togglebtn />
              <NavLink 
                to="/admin" 
                className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 transition-all text-sm font-medium text-gray-700 dark:text-zinc-300 shadow-sm group"
              >
                <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:-translate-x-1 transition-transform" /> 
                Back to Dashboard
              </NavLink>
          </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="bg-white dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800/50 rounded-2xl p-6 min-h-[400px] shadow-sm">
          
          {/* LOADING STATE */}
          {loading && problems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500 dark:text-zinc-500">
              <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
              <p>Loading problems...</p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && problems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-500 dark:text-zinc-500">
              <div className="p-4 bg-gray-100 dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-zinc-800">
                <Ban className="w-8 h-8 opacity-50" />
              </div>
              <p>No problems found to delete.</p>
            </div>
          )}

          {/* PROBLEM LIST */}
          <div className="space-y-3">
            {problems.map((problem) => (
              <div
                key={problem._id}
                className="group flex flex-col sm:flex-row justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-rose-300 dark:hover:border-rose-500/30 hover:bg-white dark:hover:bg-zinc-800/80 transition-all duration-200 gap-4 shadow-sm hover:shadow-md"
              >
                {/* Left: Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="h-10 w-10 rounded-lg bg-white dark:bg-zinc-950 flex items-center justify-center border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-500 font-mono text-sm group-hover:text-rose-500 transition-colors shadow-sm">
                      <Trash2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-200 group-hover:text-rose-600 dark:group-hover:text-white transition-colors">
                        {problem.title}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-zinc-500 hidden sm:inline-block">ID: {problem._id.slice(-6)}</span>
                      </div>
                    </div>
                </div>

                {/* Right: Delete Button */}
                <button
                  className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-950 text-rose-600 dark:text-rose-500 border border-gray-200 dark:border-zinc-800 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-600 dark:hover:border-rose-600 font-medium transition-all duration-200 shadow-sm"
                  onClick={() => setSelectedProblem(problem)}
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl shadow-2xl max-w-md w-full relative animate-in zoom-in-95 duration-200">
            
            {/* Close Icon */}
            <button 
                onClick={() => setSelectedProblem(null)}
                className="absolute top-4 right-4 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-500" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Problem?</h3>
                
                <p className="text-gray-500 dark:text-zinc-400 mb-8 leading-relaxed">
                  Are you sure you want to permanently delete <br/>
                  <span className="text-gray-900 dark:text-zinc-200 font-semibold">"{selectedProblem.title}"</span>? 
                  <br /> This action cannot be undone.
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200 font-medium transition-colors border border-gray-200 dark:border-zinc-700"
                    onClick={() => setSelectedProblem(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="cursor-pointer flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium transition-colors shadow-lg shadow-rose-900/20"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                             <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                        </span>
                    ) : (
                        "Yes, Delete"
                    )}
                  </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDelete;