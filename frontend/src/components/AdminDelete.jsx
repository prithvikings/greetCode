// src/pages/AdminDelete.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { Trash2 } from "lucide-react";
import {NavLink} from "react-router-dom";

const AdminDelete = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

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

  // Delete the selected problem
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

  return (
    <div className="p-10 min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-6">Delete Problems</h1>
          <NavLink to="/admin" className="btn btn-primary btn-sm">
            Back to Admin Dashboard
          </NavLink>
        </div>
        {/* LOADING STATE */}
        {loading && problems.length === 0 && (
          <div className="text-center text-lg opacity-70">Loading...</div>
        )}

        {/* LIST OF PROBLEMS */}
        <div className="space-y-4 mt-6">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-error/40 transition-all flex justify-between items-center"
            >
              {/* LEFT */}
              <div>
                <h2 className="text-lg font-semibold">{problem.title}</h2>
                <p className="text-sm opacity-70">
                  Difficulty: {problem.difficulty}
                </p>
              </div>

              {/* RIGHT */}
              <button
                className="btn btn-error btn-sm gap-2"
                onClick={() => setSelectedProblem(problem)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))}

          {problems.length === 0 && !loading && (
            <div className="text-center opacity-70 mt-10">
              No problems created yet.
            </div>
          )}
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {selectedProblem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card bg-base-100 p-6 shadow-xl w-96">
            <h3 className="text-xl font-bold">Delete Problem?</h3>
            <p className="mt-2 opacity-80">
              Are you sure you want to delete{" "}
              <strong>{selectedProblem.title}</strong>? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedProblem(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error btn-sm"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDelete;
