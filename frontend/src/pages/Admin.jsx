import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FilePlus, Pencil, Trash2 } from "lucide-react";

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
  ];

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
        <NavLink to="/" className="btn-primary btn">Go Back</NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {actions.map((item, idx) => (
          <div
            key={idx}
            className="card bg-base-100 shadow-xl p-6 border border-base-300 hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <h2 className="text-xl font-semibold">{item.title}</h2>
            </div>

            <p className="text-sm text-gray-600 mb-6">{item.description}</p>

            <button
              className="btn btn-primary w-full"
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
