import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FilePlus, Pencil, Trash2, Video } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create Problem",
      description: "Add a new coding problem to the platform.",
      icon: <FilePlus className="w-10 h-10 text-primary" />,
      button: "Create",
      route: "/admin/create-problem",
    },
    {
      title: "Update Problem",
      description: "Modify any existing problem details or test cases.",
      icon: <Pencil className="w-10 h-10 text-warning" />,
      button: "Update",
      route: "/admin/update-problem",
    },
    {
      title: "Delete Problem",
      description: "Remove a problem permanently from the platform.",
      icon: <Trash2 className="w-10 h-10 text-error" />,
      button: "Delete",
      route: "/admin/delete-problem",
    },

    {
      title: "Video Upload",
      description: "Upload new videos Solution of the platform.",
      icon: <Video className="w-10 h-10 text-error" />,
      button: "Upload",
      route: "/admin/video-upload",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8 text-neutral-300">Admin Panel</h1>
        <NavLink to="/" className="btn btn-md bg-neutral-800 hover:bg-zinc-850 active:bg-zinc-950 active:scale-0.95 text-yellow-400 font-medium  rounded-md drop-shadow-2xl shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">Go Back</NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {actions.map((item, idx) => (
          <div
            key={idx}
            className="card bg-zinc-800 shadow-xl p-6 border border-base-300 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <h2 className="text-xl font-semibold text-zinc-300">{item.title}</h2>
            </div>

            <p className="text-sm text-zinc-400 mb-6">{item.description}</p>

            <button
              className="btn hover:bg-zinc-850 active:bg-zinc-900 active:scale-0.95 bg-gradient-to-l from bg-zinc-600 to bg-zinc-900 border-zinc-950 drop-shadow-3xl text-shadow-2xs"
              onClick={() => navigate(item.route)}
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
