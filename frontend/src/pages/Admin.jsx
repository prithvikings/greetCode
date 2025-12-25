import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FilePlus, Pencil, Trash2, Video, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Togglebtn } from "../components/themetoggle";

// 1. The Skeleton Loader Component
const AdminSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto mb-12 animate-pulse">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4 w-full">
            <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-900 rounded-xl border border-gray-300 dark:border-zinc-800"></div>
            <div className="space-y-2">
                <div className="h-8 w-48 bg-gray-200 dark:bg-zinc-900 rounded-md"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-900 rounded-md"></div>
            </div>
          </div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-zinc-900 rounded-lg border border-gray-300 dark:border-zinc-800"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div key={idx} className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/30 border border-gray-200 dark:border-zinc-800/50 animate-pulse h-[280px]">
            <div>
                <div className="mb-6 w-14 h-14 bg-gray-200 dark:bg-zinc-800 rounded-xl"></div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded mb-3"></div>
                <div className="space-y-2 mb-8">
                    <div className="h-3 w-full bg-gray-200 dark:bg-zinc-800/60 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-zinc-800/60 rounded"></div>
                </div>
            </div>
            <div className="w-full h-10 bg-gray-200 dark:bg-zinc-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. The Main Admin Component
const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulation: Fake load time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const actions = [
    {
      title: "Create Problem",
      description: "Add a new coding problem to the platform.",
      icon: <FilePlus className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />,
      button: "Create New",
      route: "/admin/create-problem",
      color: "hover:border-emerald-500/50",
    },
    {
      title: "Update Problem",
      description: "Modify any existing problem details or test cases.",
      icon: <Pencil className="w-8 h-8 text-amber-600 dark:text-amber-500" />,
      button: "Edit Existing",
      route: "/admin/update-problem",
      color: "hover:border-amber-500/50",
    },
    {
      title: "Delete Problem",
      description: "Remove a problem permanently from the platform.",
      icon: <Trash2 className="w-8 h-8 text-rose-600 dark:text-rose-500" />,
      button: "Delete Item",
      route: "/admin/delete-problem",
      color: "hover:border-rose-500/50",
    },
    {
      title: "Video Upload",
      description: "Upload new video solutions to the platform.",
      icon: <Video className="w-8 h-8 text-blue-600 dark:text-blue-500" />,
      button: "Upload Video",
      route: "/admin/video-upload",
      color: "hover:border-blue-500/50",
    },
  ];

  if (loading) {
    return <AdminSkeleton />;
  }

  return (
    <>
      {/* 3. Embedded Styles for Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* 4. Main Content Wrapper with Animation Class */}
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6 md:p-12 font-sans selection:bg-gray-200 dark:selection:bg-zinc-800 animate-fade-in transition-colors duration-300">
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            
            {/* Header Title Area */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <LayoutDashboard className="w-6 h-6 text-gray-500 dark:text-zinc-400" />
              </div>
              <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Admin Dashboard</h1>
                  <p className="text-gray-500 dark:text-zinc-400 mt-1 text-sm">Manage problems, content, and configurations.</p>
              </div>
            </div>

            {/* Actions Area */}
            <div className="flex items-center gap-4">
                <Togglebtn />
                <NavLink 
                to="/" 
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 transition-all duration-200 group shadow-sm"
                >
                <ArrowLeft className="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Back to Home</span>
                </NavLink>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((item, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 ${item.color}`}
            >
              <div>
                  <div className="mb-6 p-3 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 w-fit group-hover:scale-105 transition-transform duration-300 shadow-inner">
                      {item.icon}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mb-8">
                      {item.description}
                  </p>
              </div>
              <button
                onClick={() => navigate(item.route)}
                className="w-full py-2.5 px-4 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-900 dark:text-zinc-200 text-sm font-medium transition-colors border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 flex items-center justify-center gap-2"
              >
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;