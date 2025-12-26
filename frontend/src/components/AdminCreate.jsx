import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Code2, 
  Eye, 
  EyeOff, 
  FileText, 
  CheckCircle2 
} from "lucide-react";

// --- ZOD SCHEMA (UNCHANGED) ---
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

// Utility (UNCHANGED)
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
    // CLEAN ALL STRING FIELDS (UNCHANGED LOGIC)
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

  // --- REUSABLE STYLES ---
  const inputClass = "w-full bg-zinc-950 text-zinc-100 border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 placeholder-zinc-600 transition-all";
  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";
  const cardClass = "bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8 backdrop-blur-sm";
  const sectionHeaderClass = "flex items-center gap-3 text-xl font-bold text-zinc-100 mb-6 pb-4 border-b border-zinc-800";
  const codeEditorClass = "w-full bg-zinc-950 text-emerald-400 font-mono text-sm border border-zinc-800 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 leading-relaxed";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans selection:bg-emerald-500/30">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
             <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
               <Plus className="w-6 h-6 text-emerald-500" />
             </div>
             Create New Problem
           </h1>
           <p className="text-zinc-400 mt-2 ml-1">Define the problem details, test cases, and solution code.</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all text-sm font-medium text-zinc-300"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8">
        
        {/* SECTION 1: BASIC INFO */}
        <div className={cardClass}>
          <div className={sectionHeaderClass}>
            <FileText className="w-5 h-5 text-emerald-500" />
            Basic Information
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className={labelClass}>Problem Title</label>
              <input
                {...register("title")}
                className={inputClass}
                placeholder="e.g. Two Sum"
              />
              {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* Difficulty */}
            <div>
              <label className={labelClass}>Difficulty</label>
              <div className="relative">
                <select {...register("difficulty")} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className={labelClass}>Category / Tags</label>
              <div className="relative">
                <select {...register("tags.0")} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="arrays">Arrays</option>
                  <option value="strings">Strings</option>
                  <option value="math">Math</option>
                  <option value="dp">Dynamic Programming</option>
                </select>
                 <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-zinc-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                {...register("description")}
                className={`${inputClass} min-h-[150px]`}
                placeholder="Explain the problem clearly..."
              />
              {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2: VISIBLE TEST CASES */}
        <div className={cardClass}>
           <div className={sectionHeaderClass}>
            <Eye className="w-5 h-5 text-emerald-500" />
            Visible Test Cases (Examples)
          </div>

          <div className="space-y-6">
            {visibleFields.map((field, index) => (
              <div key={field.id} className="relative p-6 rounded-xl bg-zinc-950 border border-zinc-800/50 group hover:border-zinc-700 transition-colors">
                <div className="absolute -top-3 left-4 px-2 bg-zinc-900 text-xs text-zinc-500 font-mono border border-zinc-800 rounded">
                    Case #{index + 1}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className={labelClass}>Input</label>
                        <textarea
                            {...register(`visibleTestCases.${index}.input`)}
                            className={`${inputClass} font-mono text-sm`}
                            rows={2}
                            placeholder="Input args"
                        />
                    </div>
                     <div>
                        <label className={labelClass}>Expected Output</label>
                        <textarea
                            {...register(`visibleTestCases.${index}.output`)}
                            className={`${inputClass} font-mono text-sm`}
                            rows={2}
                            placeholder="Return value"
                        />
                    </div>
                </div>
                
                <div className="mb-4">
                     <label className={labelClass}>Explanation</label>
                     <textarea
                        {...register(`visibleTestCases.${index}.explanation`)}
                        className={inputClass}
                        rows={2}
                        placeholder="Why is this the output?"
                     />
                </div>

                <div className="flex justify-end">
                    <button
                    type="button"
                    onClick={() => removeVisible(index)}
                    className="flex items-center gap-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    >
                    <Trash2 className="w-4 h-4" /> Remove Case
                    </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addVisible({ input: "", output: "", explanation: "" })}
              className="w-full py-3 border border-dashed border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-xl text-zinc-400 hover:text-emerald-500 flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Visible Test Case
            </button>
          </div>
        </div>

        {/* SECTION 3: HIDDEN TEST CASES */}
        <div className={cardClass}>
           <div className={sectionHeaderClass}>
            <EyeOff className="w-5 h-5 text-emerald-500" />
            Hidden Test Cases (Validation)
          </div>

          <div className="space-y-6">
            {hiddenFields.map((field, index) => (
              <div key={field.id} className="relative p-6 rounded-xl bg-zinc-950 border border-zinc-800/50 group hover:border-zinc-700 transition-colors">
                 <div className="absolute -top-3 left-4 px-2 bg-zinc-900 text-xs text-zinc-500 font-mono border border-zinc-800 rounded">
                    Hidden #{index + 1}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                   <div>
                        <label className={labelClass}>Input</label>
                        <textarea
                            {...register(`hiddenTestCases.${index}.input`)}
                            className={`${inputClass} font-mono text-sm`}
                            rows={2}
                        />
                    </div>
                     <div>
                        <label className={labelClass}>Expected Output</label>
                        <textarea
                            {...register(`hiddenTestCases.${index}.output`)}
                            className={`${inputClass} font-mono text-sm`}
                            rows={2}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => removeHidden(index)}
                        className="flex items-center gap-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg text-sm transition-colors"
                    >
                        <Trash2 className="w-4 h-4" /> Remove Case
                    </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addHidden({ input: "", output: "" })}
               className="w-full py-3 border border-dashed border-zinc-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 rounded-xl text-zinc-400 hover:text-emerald-500 flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Hidden Test Case
            </button>
          </div>
        </div>

        {/* SECTION 4: STARTER CODE */}
        <div className={cardClass}>
           <div className={sectionHeaderClass}>
            <Code2 className="w-5 h-5 text-emerald-500" />
            Starter Boilerplate
          </div>

          <div className="grid grid-cols-1 gap-6">
            {["c++", "java", "javascript"].map((lang, idx) => (
              <div key={lang}>
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
                     {lang === "c++" ? <div className="w-2 h-2 rounded-full bg-blue-500"></div> : 
                      lang === "java" ? <div className="w-2 h-2 rounded-full bg-orange-500"></div> :
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     }
                    {lang}
                </label>
                <textarea
                  {...register(`startCode.${idx}.initialCode`)}
                  className={codeEditorClass}
                  rows={6}
                  spellCheck="false"
                  placeholder={`// Enter starter code for ${lang}...`}
                />
                <input type="hidden" {...register(`startCode.${idx}.Language`)} value={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: REFERENCE SOLUTION */}
        <div className={cardClass}>
           <div className={sectionHeaderClass}>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Reference Solution
          </div>

          <div className="grid grid-cols-1 gap-6">
            {["c++", "java", "javascript"].map((lang, idx) => (
              <div key={lang}>
               <label className="flex items-center gap-2 text-sm font-semibold text-zinc-300 mb-2 uppercase tracking-wider">
                     {lang === "c++" ? <div className="w-2 h-2 rounded-full bg-blue-500"></div> : 
                      lang === "java" ? <div className="w-2 h-2 rounded-full bg-orange-500"></div> :
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     }
                    {lang} Solution
                </label>
                <textarea
                  {...register(`referenceSolution.${idx}.solutionCode`)}
                  className={codeEditorClass}
                  rows={6}
                  spellCheck="false"
                  placeholder={`// Full working solution for ${lang}...`}
                />
                <input type="hidden" {...register(`referenceSolution.${idx}.Language`)} value={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="sticky bottom-6 flex justify-end">
            <button 
                type="submit" 
                className="btn cursor-pointer border-none shadow-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all transform hover:scale-105"
            >
                <Save className="w-5 h-5" />
                Create Problem
            </button>
        </div>

      </form>
    </div>
  );
}

export default AdminCreate;