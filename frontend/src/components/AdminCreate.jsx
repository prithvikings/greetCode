import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

// ZOD SCHEMA (Matches backend exactly)
const problemSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()),

  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1),
        output: z.string().min(1),
        explanation: z.string().min(1),
      })
    )
    .min(1),

  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1),
        output: z.string().min(1),
      })
    )
    .min(1),

  startCode: z
    .array(
      z.object({
        Language: z.enum(["c++", "java", "javascript"]),
        initialCode: z.string().min(1),
      })
    )
    .min(1),

  referenceSolution: z
    .array(
      z.object({
        Language: z.enum(["c++", "java", "javascript"]),
        solutionCode: z.string().min(1),
      })
    )
    .min(1),
});

// Utility → normalize multiline but keep formatting
const clean = (str) => str.replace(/\r/g, "");

function AdminCreate() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      tags: ["arrays"],

      visibleTestCases: [{ input: "", output: "", explanation: "" }],
      hiddenTestCases: [{ input: "", output: "" }],

      startCode: [
        { Language: "c++", initialCode: "" },
        { Language: "java", initialCode: "" },
        { Language: "javascript", initialCode: "" },
      ],

      referenceSolution: [
        { Language: "c++", solutionCode: "" },
        { Language: "java", solutionCode: "" },
        { Language: "javascript", solutionCode: "" },
      ],
    },
  });

  const { fields: visibleFields, append: addVisible, remove: removeVisible } =
    useFieldArray({ control, name: "visibleTestCases" });

  const { fields: hiddenFields, append: addHidden, remove: removeHidden } =
    useFieldArray({ control, name: "hiddenTestCases" });

  const onSubmit = async (data) => {
    // CLEAN ALL STRING FIELDS (removes \r, weird quotes)
    const payload = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === "string" ? clean(value) : value
      )
    );

    console.log("📦 CLEAN PAYLOAD SENT:", payload);

    try {
      const res = await axiosClient.post("/api/auth/problem/create", payload);
      alert("Problem added successfully");
      navigate("/");
    } catch (err) {
      console.error("❌ Backend Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add problem");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* BASIC INFO */}
        <div className="card bg-base-100 shadow-lg p-6 space-y-3">
          <input
            {...register("title")}
            className="input input-bordered w-full"
            placeholder="Problem title"
          />

          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Problem description"
          />

          <select {...register("difficulty")} className="select select-bordered w-full">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select {...register("tags.0")} className="select select-bordered w-full">
            <option value="arrays">arrays</option>
            <option value="strings">strings</option>
            <option value="math">math</option>
          </select>
        </div>

        {/* Visible Test Cases */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl mb-3">Visible Test Cases</h2>

          {visibleFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4 space-y-2">
              <textarea
                {...register(`visibleTestCases.${index}.input`)}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Input (multi-line allowed)"
              />

              <input
                {...register(`visibleTestCases.${index}.output`)}
                placeholder="Output"
                className="input input-bordered w-full"
              />

              <textarea
                {...register(`visibleTestCases.${index}.explanation`)}
                className="textarea textarea-bordered w-full"
                rows={2}
                placeholder="Explanation"
              />

              <button
                type="button"
                className="btn btn-error"
                onClick={() => removeVisible(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-primary" onClick={() => addVisible({ input: "", output: "", explanation: "" })}>
            Add Visible Test Case
          </button>
        </div>

        {/* Hidden Test Cases */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl mb-3">Hidden Test Cases</h2>

          {hiddenFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded mb-4 space-y-2">
              <textarea
                {...register(`hiddenTestCases.${index}.input`)}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Input (multi-line allowed)"
              />

              <input
                {...register(`hiddenTestCases.${index}.output`)}
                placeholder="Output"
                className="input input-bordered w-full"
              />

              <button type="button" className="btn btn-error" onClick={() => removeHidden(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" className="btn btn-primary" onClick={() => addHidden({ input: "", output: "" })}>
            Add Hidden Test Case
          </button>
        </div>

        {/* Starter Code */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl mb-4">Starter Code</h2>

          {["c++", "java", "javascript"].map((lang, idx) => (
            <div key={lang} className="mb-4">
              <h3 className="font-semibold">{lang}</h3>

              <textarea
                {...register(`startCode.${idx}.initialCode`)}
                className="textarea textarea-bordered w-full font-mono"
                rows={6}
              />

              <input type="hidden" {...register(`startCode.${idx}.Language`)} value={lang} />
            </div>
          ))}
        </div>

        {/* Reference Solution */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h2 className="text-xl mb-4">Reference Solution</h2>

          {["c++", "java", "javascript"].map((lang, idx) => (
            <div key={lang} className="mb-4">
              <h3 className="font-semibold">{lang}</h3>

              <textarea
                {...register(`referenceSolution.${idx}.solutionCode`)}
                className="textarea textarea-bordered w-full font-mono"
                rows={6}
                placeholder={`Reference solution for ${lang}`}
              />

              <input type="hidden" {...register(`referenceSolution.${idx}.Language`)} value={lang} />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Create Problem
        </button>
      </form>
    </div>
  );
}

export default AdminCreate;
