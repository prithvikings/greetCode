// src/pages/AdminVideo.jsx
import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import { NavLink } from 'react-router-dom';
import { Togglebtn } from "../components/themetoggle"; // Import Toggle
import { 
  Video, 
  Trash2, 
  UploadCloud, 
  ArrowLeft, 
  Loader2, 
  AlertCircle,
  Hash,
  MonitorPlay
} from 'lucide-react';

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/api/auth/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Logic kept exactly as requested
    if (!window.confirm('Are you sure you want to delete this video association?')) return;
    
    try {
      await axiosClient.delete(`/api/auth/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  // Helper for difficulty colors (Updated for Light/Dark)
  const getDifficultyColor = (diff) => {
    const d = diff?.toLowerCase();
    if (d === "easy") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20";
    if (d === "medium") return "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
    if (d === "hard") return "bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20";
    return "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-700";
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4 text-gray-500 dark:text-zinc-500 transition-colors duration-300">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p>Loading problem list...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-10 flex justify-center items-start transition-colors duration-300">
        <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-500 p-6 rounded-xl flex items-center gap-4 max-w-lg">
          <AlertCircle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg">Error Loading Data</h3>
            <p className="text-sm opacity-80">{error.response?.data?.error || "An unexpected error occurred."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6 md:p-12 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <MonitorPlay className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              </div>
              Video Solutions
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 mt-2 ml-1">Manage video content associated with coding problems.</p>
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

        {/* CONTENT LIST */}
        <div className="bg-white dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800/50 rounded-2xl overflow-hidden min-h-[400px] shadow-sm">
          
          {/* Header Row (Visual only, primarily for desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Problem Title</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-3">Tags</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Data Rows */}
          <div className="divide-y divide-gray-200 dark:divide-zinc-800/50">
            {problems.map((problem, index) => (
              <div 
                key={problem._id} 
                className="group md:grid md:grid-cols-12 md:gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors flex flex-col gap-4"
              >
                {/* Index */}
                <div className="hidden md:block col-span-1 text-center text-gray-500 dark:text-zinc-600 font-mono text-sm">
                  {index + 1}
                </div>

                {/* Title */}
                <div className="col-span-4 w-full">
                  <div className="flex items-center gap-3">
                    <span className="md:hidden text-gray-500 dark:text-zinc-600 font-mono text-xs">#{index + 1}</span>
                    <div className="font-medium text-gray-900 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {problem.title}
                    </div>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="col-span-2 w-full flex md:block">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>

                {/* Tags */}
                <div className="col-span-3 w-full">
                   <div className="flex flex-wrap gap-2">
                      {/* Check if tags is array or string to be safe, though code implied logic handled it */}
                      {Array.isArray(problem.tags) ? (
                        problem.tags.slice(0, 2).map((tag, i) => (
                           <span key={i} className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 px-2 py-1 rounded">
                             <Hash className="w-3 h-3 opacity-50" /> {tag}
                           </span>
                        ))
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 px-2 py-1 rounded">
                           <Hash className="w-3 h-3 opacity-50" /> {problem.tags}
                        </span>
                      )}
                      {Array.isArray(problem.tags) && problem.tags.length > 2 && (
                        <span className="text-xs text-gray-400 dark:text-zinc-600 self-center">+{problem.tags.length - 2} more</span>
                      )}
                   </div>
                </div>

                {/* Actions */}
                <div className="col-span-2 w-full flex justify-end items-center gap-2 mt-2 md:mt-0 border-t md:border-t-0 border-gray-100 dark:border-zinc-800 pt-3 md:pt-0">
                  <NavLink 
                    to={`/admin/upload-video/${problem._id}`} 
                    className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all text-xs font-medium"
                    title="Upload Video"
                  >
                    <UploadCloud className="w-4 h-4" /> 
                    <span className="md:hidden lg:inline">Upload</span>
                  </NavLink>
                  
                  <button 
                    onClick={() => handleDelete(problem._id)}
                    className="flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/20 transition-all text-xs font-medium"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="md:hidden lg:inline">Delete</span>
                  </button>
                </div>

              </div>
            ))}

            {problems.length === 0 && (
               <div className="p-12 text-center text-gray-500 dark:text-zinc-500">
                  No problems found in the database.
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVideo;