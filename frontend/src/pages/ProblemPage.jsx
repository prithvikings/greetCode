// src/pages/ProblemPage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axiosClient from "../utils/axiosClient";
import AiChat from "../components/AiChat.jsx";
import Editorial from "../components/Editorial.jsx";
const languageOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "java", label: "Java" },
  { id: "c++", label: "C++" },
];

export default function ProblemPage() {
  const { problemid } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("// loading starter...");
  const [runResult, setRunResult] = useState(null); // array of results from run endpoint
  const [submitResult, setSubmitResult] = useState(null); // submission object from submit endpoint
  const [activeLeftTab, setActiveLeftTab] = useState("description"); // description/editor/editor tabs
  const [activeRightTab, setActiveRightTab] = useState("code"); // not used heavily here
  const [customInput, setCustomInput] = useState(""); // for manual run input if needed
  const [userSubmissions, setUserSubmissions] = useState([]);
  const editorRef = useRef(null);
  const [codeMap, setCodeMap] = useState({
    javascript: "",
    java: "",
    "c++": "",
  });

  // --- Fetch problem once on mount / when problemid changes ---
  useEffect(() => {
    if (!problemid) return;
    let mounted = true;
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(
          `/api/auth/problem/getProblemById/${problemid}`
        );

        if (!mounted) return;
        setProblem(res.data);
        console.log("Fetched problem:", res.data);
        const starter = pickStarterCode(
          res.data.startCode || [],
          selectedLanguage
        );
        setCode(starter ?? "// Starter code not provided for this language");
      } catch (err) {
        console.error("Fetch problem error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProblem();
    return () => {
      mounted = false;
    };
  }, [problemid]); // fetch only when problemid changes

  // --- When user switches language or when problem loads, update code to starter code for that language ---
  useEffect(() => {
    if (!problem) return;
    const starter = pickStarterCode(problem.startCode || [], selectedLanguage);
    if (starter) setCode(starter);
    // don't force the change if user already typed custom code? currently we replace with starter - ok for now.
  }, [problem, selectedLanguage]);

  // Helper: pick starter initialCode from problem.startCode array
  function pickStarterCode(startCodeArray = [], lang) {
    if (!Array.isArray(startCodeArray)) return null;
    // Accept multiple casing: Language can be 'C++','c++','Java','javascript' etc.
    const found = startCodeArray.find((sc) => {
      if (!sc?.Language) return false;
      const normalized = String(sc.Language).toLowerCase();
      const target = lang.toLowerCase();
      // some DB store 'C++' while our lang is 'c++'
      return normalized === target;
    });
    return found?.initialCode ?? null;
  }

  // Editor mount handler for Monaco
  function handleEditorMount(editor) {
    editorRef.current = editor;
  }

  // Called on code change in editor
  function handleEditorChange(value) {
    setCode(value);
    setCodeMap((prev) => ({
      ...prev,
      [selectedLanguage]: value,
    }));
  }

  // ---- RUN: run against visibleTestCases by calling backend run endpoint ----
  async function handleRun() {
    if (!problemid) return;
    setRunResult(null);
    setSubmitResult(null);
    try {
      setLoading(true);

      const payload = {
        code,
        language: selectedLanguage,
      };
      console.log("Run payload:", payload);
      const res = await axiosClient.post(
        `/api/auth/problem/run/${problemid}`,
        payload
      );
      setRunResult(res.data.results || res.data); // backend responds { message, results }
    } catch (err) {
      console.error("Run error:", err.response?.data || err);
      setRunResult({ error: err.response?.data?.message || "Run failed" });
    } finally {
      setLoading(false);
    }
  }

  // ---- SUBMIT: submit code to be judged against hidden tests ----
  async function handleSubmitCode() {
    if (!problemid) return;
    setSubmitResult(null);
    setRunResult(null);
    try {
      setLoading(true);
      const payload = {
        code,
        language: selectedLanguage,
      };
      console.log("Submit payload:", payload);
      const res = await axiosClient.post(
        `/api/auth/problem/submit/${problemid}`,
        payload
      );
      setSubmitResult(res.data.submission || res.data);
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      setSubmitResult({
        error: err.response?.data?.message || "Submit failed",
      });
    } finally {
      setLoading(false);
    }
  }

  // Utility: map judge status_id to readable label (E.g., your judge uses status_id===3 for accepted)
  function mapStatusIdToLabel(status_id) {
    switch (status_id) {
      case 1:
        return "In Queue";
      case 2:
        return "Processing";
      case 3:
        return "Accepted";
      case 4:
        return "Runtime/Error";
      case 5:
        return "Time Limit Exceeded";
      default:
        return `Status ${status_id}`;
    }
  }

  // UI pieces
  const visibleTests = useMemo(
    () => problem?.visibleTestCases || [],
    [problem]
  );
  const hiddenTestsCount = useMemo(
    () => (problem?.hiddenTestCases || []).length,
    [problem]
  );

  if (loading && !problem) return <div className="p-6">Loading...</div>;
  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="container mx-auto grid grid-cols-12 gap-6">
        {/* LEFT: Description / Examples / Tests */}
        <div className="col-span-5">
          <div className="card p-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">
                  {problem?.title || "Problem"}
                </h1>
                <div className="text-sm text-muted mt-1">
                  {problem?.difficulty}
                </div>
              </div>
              <div>
                <button className="btn btn-sm" onClick={() => navigate(-1)}>
                  Back
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="tabs mb-3">
                <button
                  className={`tab ${
                    activeLeftTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveLeftTab("description")}
                >
                  Description
                </button>
                <button
                  className={`tab ${
                    activeLeftTab === "examples" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveLeftTab("examples")}
                >
                  Examples
                </button>
                <button
                  className={`tab ${
                    activeLeftTab === "tests" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveLeftTab("tests")}
                >
                  Tests
                </button>

                <button
                  className={`tab ${
                    activeLeftTab === "tests" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveLeftTab("Editorial")}
                >
                  Editorial
                </button>

                <button
                  className={`tab ${
                    activeLeftTab === "Aichat" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveLeftTab("Aichat")}
                >
                  AiChat
                </button>

                <button
                  className={`tab ${
                    activeLeftTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={async () => {
                    setActiveLeftTab("submissions");
                    try {
                      const res = await axiosClient.get(
                        `/api/auth/problem/submittedProblem/${problemid}`
                      );
                      setUserSubmissions(res.data.submissions || []);
                    } catch (err) {
                      console.error("Cannot fetch submissions:", err);
                      setUserSubmissions([]);
                    }
                  }}
                >
                  Submissions
                </button>
              </div>

              {activeLeftTab === "Aichat" && <AiChat problem={problem} />}
              {activeLeftTab === 'Editorial' && (
                  <div className="not-prose mt-4">
  <Editorial
    secureUrl={problem.secureUrl}
    thumbnailUrl={problem.thumbnailUrl}
    duration={problem.duration}
  />
</div>

                )}

              {activeLeftTab === "description" && (
                <div
                  className="prose max-w-none"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {/* If description is HTML or markdown, you may want to render accordingly.
                      For now we use plain text */}
                  {problem?.description}
                </div>
              )}

              {activeLeftTab === "submissions" && (
                <div className="mt-3">
                  <h3 className="font-semibold">Your Submissions</h3>

                  {userSubmissions.length === 0 && (
                    <div className="text-sm mt-2">No submissions yet.</div>
                  )}

                  {userSubmissions.length > 0 && (
                    <div className="space-y-3 mt-3">
                      {userSubmissions.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-3 border rounded bg-base-100"
                        >
                          <div>
                            <strong>Status:</strong> {sub.status}
                          </div>
                          <div>
                            <strong>Language:</strong> {sub.language}
                          </div>
                          <div>
                            <strong>Passed:</strong> {sub.testcasesPassed}/
                            {sub.totalTestcases}
                          </div>
                          <div>
                            <strong>Runtime:</strong> {sub.runtime} ms
                          </div>
                          <div>
                            <strong>Memory:</strong> {sub.memory} KB
                          </div>
                          <div className="text-xs text-muted mt-1">
                            Submitted at:{" "}
                            {new Date(sub.submittedAt).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeLeftTab === "examples" && (
                <div>
                  <h3 className="font-semibold mt-3">Visible Testcases</h3>
                  {visibleTests.length === 0 && <div>No visible testcases</div>}
                  {visibleTests.map((t, idx) => (
                    <div
                      key={idx}
                      className="my-3 border rounded p-3 bg-base-100"
                    >
                      <div>
                        <strong>Input:</strong>
                      </div>
                      <pre className="whitespace-pre-wrap">{t.input}</pre>
                      <div>
                        <strong>Output:</strong>
                      </div>
                      <pre>{t.output}</pre>
                      <div className="text-sm text-muted mt-2">
                        <strong>Explanation:</strong> {t.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeLeftTab === "tests" && (
                <div>
                  <div className="mt-2">
                    <div>
                      <strong>Hidden testcases:</strong> {hiddenTestsCount}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      Hidden tests are run only on submit
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Editor and controls */}
        <div className="col-span-7">
          <div className="card p-4 mb-4">
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.id}
                    className={`btn btn-sm ${
                      selectedLanguage === opt.id ? "btn-primary" : "btn-ghost"
                    }`}
                    onClick={() => {
                      setSelectedLanguage(opt.id);

                      const saved = codeMap[opt.id];

                      if (saved && saved.trim() !== "") {
                        setCode(saved);
                      } else {
                        const starter = pickStarterCode(
                          problem?.startCode || [],
                          opt.id
                        );
                        setCode(starter);
                        setCodeMap((prev) => ({ ...prev, [opt.id]: starter }));
                      }
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    const starter = pickStarterCode(
                      problem?.startCode || [],
                      selectedLanguage
                    );
                    setCode(starter);
                    setCodeMap((prev) => ({
                      ...prev,
                      [selectedLanguage]: starter,
                    }));
                  }}
                >
                  Reset Starter
                </button>

                <button className="btn btn-accent" onClick={handleRun}>
                  Run
                </button>
                <button className="btn btn-primary" onClick={handleSubmitCode}>
                  Submit
                </button>
              </div>
            </div>

            <div
              style={{ height: 420 }}
              className="border rounded overflow-hidden"
            >
              <Editor
                theme="vs-dark"
                height="100%"
                defaultLanguage={
                  selectedLanguage === "c++" ? "cpp" : selectedLanguage
                }
                language={selectedLanguage === "c++" ? "cpp" : selectedLanguage}
                value={code}
                onChange={(val) => handleEditorChange(val)}
                onMount={(editor) => handleEditorMount(editor)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </div>

            {/* manual input area (optional) */}
            <div className="mt-3">
              <label className="label">
                <span className="label-text">Custom stdin (for Run only)</span>
              </label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Put custom input here to test (Run uses visible tests by default)"
              />
            </div>

            {/* Results */}
            <div className="mt-4">
              {/* Run results */}
              {runResult && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Run Results</h3>
                  {runResult.error && (
                    <div className="text-error">{String(runResult.error)}</div>
                  )}
                  {Array.isArray(runResult) &&
                    runResult.length > 0 &&
                    runResult.map((r, i) => (
                      <div
                        key={i}
                        className="border rounded p-3 my-2 bg-base-100"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <strong>Test #{i + 1}</strong> —{" "}
                            {mapStatusIdToLabel(r.status_id)}
                          </div>
                          <div className="text-sm text-muted">
                            time: {r.time ?? "N/A"}s memory: {r.memory ?? "N/A"}
                          </div>
                        </div>
                        <div className="mt-2">
                          <div>
                            <strong>Stdout:</strong>
                          </div>
                          <pre className="whitespace-pre-wrap">
                            {r.stdout ?? r.output ?? r.stdout_raw ?? ""}
                          </pre>
                        </div>
                        {r.stderr && (
                          <div className="mt-2 text-error">
                            <strong>Stderr:</strong>
                            <pre className="whitespace-pre-wrap">
                              {r.stderr}
                            </pre>
                          </div>
                        )}
                        {r.compile_output && (
                          <div className="mt-2 text-warning">
                            <strong>Compile:</strong>
                            <pre className="whitespace-pre-wrap">
                              {r.compile_output}
                            </pre>
                          </div>
                        )}
                        <div className="mt-2">
                          <strong>Expected:</strong>
                          <pre className="whitespace-pre-wrap">
                            {r.expected_output ?? ""}
                          </pre>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Submit results */}
              {submitResult && (
                <div>
                  <h3 className="text-lg font-semibold">Submission</h3>
                  {submitResult.error && (
                    <div className="text-error">
                      {String(submitResult.error)}
                    </div>
                  )}
                  {!submitResult.error && (
                    <div className="border rounded p-3 bg-base-100">
                      <div>
                        <strong>Status:</strong>{" "}
                        {submitResult.status ??
                          submitResult?.submission?.status}
                      </div>
                      <div>
                        <strong>Passed:</strong>{" "}
                        {submitResult.testcasesPassed ??
                          submitResult?.submission?.testcasesPassed}
                        /
                        {submitResult.totalTestcases ??
                          submitResult?.submission?.totalTestcases}
                      </div>
                      <div>
                        <strong>Time:</strong>{" "}
                        {submitResult.timeTaken ??
                          submitResult?.submission?.timeTaken}{" "}
                        ms
                      </div>
                      {submitResult.errorMessage && (
                        <div className="text-error mt-2">
                          <strong>Error:</strong> {submitResult.errorMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
