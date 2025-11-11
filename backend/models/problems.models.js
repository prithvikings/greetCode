import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    tags: [{ type: String }],
    visibleTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String, required: true },
      },
    ],
    hiddenTestCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
    startCode: [
      {
        Language: { type: String, required: true },
        initialCode: { type: String, required: true },
      },
    ],
    referenceSolution: [
      {
        Language: { type: String, required: true },
        solutionCode: { type: String, required: true },
      }
    ],
    timeLimit: { type: Number, default: 1 }, // in seconds
    memoryLimit: { type: Number, default: 256 }, // in MB
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model("Problem", problemSchema);