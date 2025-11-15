// src/pages/AdminUpdateForm.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

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

  // Fetch problem
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
      // Build updated payload
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

  if (loading || !problem) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-10 min-h-screen bg-base-200">
      <div className="max-w-4xl mx-auto">
        <button className="btn btn-sm mb-5" onClick={() => navigate(-1)}>
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Edit Problem</h1>

        {/* TITLE */}
        <div className="mb-4">
          <label className="label font-semibold">Title</label>
          <input
            className="input input-bordered w-full"
            value={problem.title}
            onChange={(e) =>
              setProblem((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="label font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={6}
            value={problem.description}
            onChange={(e) =>
              setProblem((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        {/* DIFFICULTY */}
        <div className="mb-4">
          <label className="label font-semibold">Difficulty</label>
          <select
            className="select select-bordered w-full"
            value={problem.difficulty}
            onChange={(e) =>
              setProblem((prev) => ({ ...prev, difficulty: e.target.value }))
            }
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        {/* TAGS */}
        <div className="mb-4">
          <label className="label font-semibold">Tags (comma separated)</label>
          <input
            className="input input-bordered w-full"
            value={problem.tags.join(", ")}
            onChange={(e) =>
              setProblem((prev) => ({
                ...prev,
                tags: e.target.value.split(",").map((x) => x.trim()),
              }))
            }
          />
        </div>

        {/* START CODE */}
        <h2 className="text-xl font-bold mt-6 mb-2">Starter Code</h2>

        <div className="tabs mb-2">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`tab ${
                selectedCodeTab === lang ? "tab-active" : ""
              }`}
              onClick={() => setSelectedCodeTab(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <Editor
          theme="vs-dark"
          height="250px"
          language={selectedCodeTab === "c++" ? "cpp" : selectedCodeTab}
          value={startCodes[selectedCodeTab]}
          onChange={(val) =>
            setStartCodes((prev) => ({
              ...prev,
              [selectedCodeTab]: val,
            }))
          }
        />

        {/* REFERENCE SOLUTIONS */}
        <h2 className="text-xl font-bold mt-8 mb-2">Reference Solutions</h2>

        <div className="tabs mb-2">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`tab ${selectedRefTab === lang ? "tab-active" : ""}`}
              onClick={() => setSelectedRefTab(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <Editor
          theme="vs-dark"
          height="250px"
          language={selectedRefTab === "c++" ? "cpp" : selectedRefTab}
          value={refCodes[selectedRefTab]}
          onChange={(val) =>
            setRefCodes((prev) => ({
              ...prev,
              [selectedRefTab]: val,
            }))
          }
        />

        <button className="btn btn-primary mt-8" onClick={handleUpdate}>
          Update Problem
        </button>
      </div>
    </div>
  );
};

export default AdminUpdateForm;
