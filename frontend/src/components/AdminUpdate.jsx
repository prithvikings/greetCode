// src/pages/AdminUpdate.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Pencil } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminUpdate = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all problems
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

  return (
    <div className="p-10 min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Update Problems</h1>
        <NavLink to="/admin" className="btn btn-primary mb-5">
          Back to Admin Dashboard
        </NavLink>
        {loading && problems.length === 0 && (
          <div className="text-center text-lg opacity-70">Loading...</div>
        )}

        <div className="space-y-4 mt-6">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{problem.title}</h2>
                <p className="text-sm opacity-70">
                  Difficulty: {problem.difficulty}
                </p>
              </div>

              <button
                className="btn btn-warning btn-sm gap-2"
                onClick={() => navigate(`/admin/update/${problem._id}`)}
              >
                <Pencil size={16} /> Edit
              </button>
            </div>
          ))}
        </div>

        {problems.length === 0 && !loading && (
          <div className="text-center opacity-70 mt-10">No problems found.</div>
        )}
      </div>
    </div>
  );
};

export default AdminUpdate;
