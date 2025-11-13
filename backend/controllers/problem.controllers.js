import {getLanguageId,submitbatch,submittoken} from "../utils/languageUtils.js";
import { Problem } from "../models/problems.models.js";
import { User } from "../models/user.models.js";
import { Submission } from "../models/submission.models.js";


// Get all problems ✅
const getAllProblems = async (req, res) => {

  const problems = await Problem.find({}).select('-hiddenTestCases');
  if(problems.length===0){
    return  res.status(404).json({message:"No problems found"});
  }
  res.status(200).json(problems);
};

// Get problem by ID ✅
const getProblemById = async (req, res) => {

    const { id } = req.params;
    try{
        if(!id){
            return res.status(400).json({message:"Problem id is required"});
        }

        const problem=await Problem.findById(id).select('-hiddenTestCases');
        if(!problem){
            return res.status(404).json({message:"Problem not found"});
        }

        res.status(200).json(problem);
    }
    catch(err){
        console.error("Error getting problem by id:",err);
        res.status(500).json({message:"Internal server error"});
    }
};

// Create a new problem ✅
const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    timeLimit,
    memoryLimit,
    createdBy,
  } = req.body;

  if (!Array.isArray(referenceSolution) || referenceSolution.length === 0) {
    return res
      .status(400)
      .json({ message: "referenceSolution is missing or empty" });
  }
  if (!Array.isArray(visibleTestCases) || visibleTestCases.length === 0) {
    return res
      .status(400)
      .json({ message: "visibleTestCases is missing or empty" });
  }
  try {
    for (const { Language, solutionCode } of referenceSolution) {
      const languageId = getLanguageId(Language);

      const submission = visibleTestCases.map((testcases) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: testcases.input,
        expected_output: testcases.output,
      }));

      if (submission.length === 0) {
        return res
          .status(400)
          .json({ message: "No test cases created for submission" });
      }

      const submitResult = await submitbatch(submission); // this will return an array of token id now we have to send it to another api to get the result which will return the status of each submission

      const result = submitResult.map((value) => value.token);
      // Now we have array of tokens we have to send it to another api to get the result

      const testResult = await submittoken(result);
      // testResult will contain the status of each submission

      for (const test of testResult) {
        if (test.status_id !== 3) {
          // 3 means accepted
          return res.status(400).json({
            message: `Reference solution failed for language ${Language}`,
          });
        }
      }
    }

    // If all reference solutions pass then we can create the problem
    // Logic to save the problem to the database goes here

    const userProblem = await Problem.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(201).json({ message: "Problem created successfully" });
  } catch (err) {
    console.error("Error creating problem:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update problem ✅
const updateProblem = async (req, res) => {
  const { id } = req.params;

  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    startCode,
    referenceSolution,
    timeLimit,
    memoryLimit,
    createdBy,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Problem id is required" });
    }

    const existingProblem = await Problem.findById(id);
    if (!existingProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    for (const { Language, solutionCode } of referenceSolution) {
      const languageId = getLanguageId(Language);

      const submission = visibleTestCases.map((testcases) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: testcases.input,
        expected_output: testcases.output,
      }));

      if (submission.length === 0) {
        return res
          .status(400)
          .json({ message: "No test cases created for submission" });
      }

      const submitResult = await submitbatch(submission); // this will return an array of token id now we have to send it to another api to get the result which will return the status of each submission

      const result = submitResult.map((value) => value.token);
      // Now we have array of tokens we have to send it to another api to get the result

      const testResult = await submittoken(result);
      // testResult will contain the status of each submission

      for (const test of testResult) {
        if (test.status_id !== 3) {
          // 3 means accepted
          return res.status(400).json({
            message: `Reference solution failed for language ${Language}`,
          });
        }
      }
    }

    const updatedProblem = await Problem.findByIdAndUpdate(id,{ ...req.body },{ runValidators: true, new: true });

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found after update" });
    }


    res.status(200).json({ message: "Problem updated successfully" },updatedProblem);
  } catch (err) {
    console.error("Error updating problem:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete problem ✅
const deleteProblem = async (req, res) => {
  // Logic to delete a problem by ID
  const {id}=req.params;
  try{
    if(!id){
        return res.status(400).json({message:"Problem id is required"});
    }

    const existingProblem=await Problem.findById(id);
    if(!existingProblem){
        return res.status(404).json({message:"Problem not found"});
    }

    await Problem.findByIdAndDelete(id);
    res.status(200).json({message:"Problem deleted successfully"});
  }catch(err){
    console.error("Error deleting problem:",err);
    res.status(500).json({message:"Internal server error"});
  }
};

// Get solved problems by user ✅
const solvedProblemsByUser = async (req, res) => {
  // Logic to get solved problems by user
  const userId=req.userId;
  try{
    const user=await User.findById(userId).populate({
      path:'problemSolved',
      select:'_id title difficulty tags'
    });

    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    
    res.status(200).json({
      message:"Solved problems fetched successfully",
      solvedProblems:user.problemSolved,
      noofproblemsSolved:user.problemSolved.length
    });

  }catch(err){
    console.error("Error getting solved problems by user:",err);
    res.status(500).json({message:"Internal server error"});
  }
};


const submittedProblem=async(req,res)=>{
  
  try{
    const userId=req.userId;
  const problemId=req.params.pId;

  const ans= await Submission.find({userId:userId,problemId:problemId});
  if(ans.length===0){
    return res.status(404).json({message:"No submissions found for this problem by the user"});
  }
  res.status(200).json({
    message:"Submitted problems fetched successfully",
    submissions:ans,
    noofsubmissions:ans.length
  });

  }catch(err){
    console.error("Error getting submitted problems by user:",err);
    res.status(500).json({message:"Internal server error"});
  }
};
export {getAllProblems,getProblemById,createProblem,updateProblem,deleteProblem,solvedProblemsByUser,submittedProblem};
