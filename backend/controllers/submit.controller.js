import { Problem } from "../models/problems.models.js";
import { Submission } from "../models/submission.models.js";
import {
  getLanguageId,
  submitbatch,
  submittoken,
} from "../utils/languageUtils.js";
import { User } from "../models/user.models.js";

export const submitController = async (req, res) => {
  // Logic to handle code submission
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const problemId = req.params.id;
    if (!problemId)
      return res.status(400).json({ message: "Problem ID is required" });
    const { code, language } = req.body;
    if (!code || !language)
      return res
        .status(400)
        .json({ message: "Code and language are required" });

    // fetch problem details from DB
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending", // Initial status
      submittedAt: new Date(),
      testcasesPassed: 0,
      totalTestcases: problem.hiddenTestCases.length,
    });

    // Here you would typically add logic to actually run the code against test cases
    const languageId = getLanguageId(language);

    const submission = problem.hiddenTestCases.map((testcases) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcases.input,
      expected_output: testcases.output,
    }));

    const submitResult = await submitbatch(submission);

    const result = submitResult.map((value) => value.token);
    const testResult = await submittoken(result);

    // Update submission with results
    let passedCount = 0;
    let memoryUsed = 0;
    let timeTaken = 0;
    let status = "accepted";
    let errormsg = null;
    for (const test of testResult) {
      if (test.status_id === 3) {
        // Assuming status id 3 means 'Accepted'
        passedCount++;
        timeTaken = timeTaken + parseFloat(test.time);
        memoryUsed = Math.max(memoryUsed, test.memory);
      } else {
        if (test.status_id == 4) {
          status = "error";
          errormsg = test.stderr;
        } else {
          status = "rejected";
          errormsg = test.stderr;
        }
      }
    }

    // Update submission record in DB
    submittedResult.status = status;
    submittedResult.testcasesPassed = passedCount;
    submittedResult.timeTaken = timeTaken;
    submittedResult.memory = memoryUsed;
    submittedResult.errorMessage = errormsg;
    await submittedResult.save();

    const user=await User.findById(userId);
    if(!user.problemSolved.includes(problemId)){
      user.problemSolved.push(problemId);
      await user.save();
    }

    res.status(200).json({
      message: "Code submitted successfully",
      submission: submittedResult,
    });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: "Error submitting code", error });
  }
};


export const runController = async (req, res) => {
  // Logic to handle code run (without saving submission)
   try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const problemId = req.params.id;
    if (!problemId)
      return res.status(400).json({ message: "Problem ID is required" });
    const { code, language } = req.body;
    if (!code || !language)
      return res
        .status(400)
        .json({ message: "Code and language are required" });

    // fetch problem details from DB
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    // Here you would typically add logic to actually run the code against test cases
    const languageId = getLanguageId(language);

    const submission = problem.visibleTestCases.map((testcases) => ({
      source_code: code,
      language_id: languageId,
      stdin: testcases.input,
      expected_output: testcases.output,
    }));

    const submitResult = await submitbatch(submission);

    const result = submitResult.map((value) => value.token);
    const testResult = await submittoken(result);

  

    res.status(200).json({
      message: "Code run successfully",
      results: testResult,
    });
  } catch (error) {
    console.error("Run Error:", error);
    res.status(500).json({ message: "Error running code", error });
  }
};