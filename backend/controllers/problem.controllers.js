import {getLanguageId,submitbatch,submittoken} from '../utils/languageUtils.js';
import {Problem} from '../models/problems.models.js';
const getAllProblems = async (req, res) => {
    // Logic to get all problems
}

const getProblemById = async (req, res) => {
    // Logic to get a problem by ID
}

const createProblem = async (req, res) => {
   const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases,
        startCode, referenceSolution, timeLimit, memoryLimit, createdBy } = req.body;


        if (!Array.isArray(referenceSolution) || referenceSolution.length === 0) {
  return res.status(400).json({ message: "referenceSolution is missing or empty" });
}
if (!Array.isArray(visibleTestCases) || visibleTestCases.length === 0) {
  return res.status(400).json({ message: "visibleTestCases is missing or empty" });
}
    try{
        for(const {Language,solutionCode} of referenceSolution){

            const languageId=getLanguageId(Language);

            const submission=visibleTestCases.map((testcases)=>({
            source_code:solutionCode,
            language_id:languageId,
            stdin:testcases.input,
            expected_output:testcases.output
        }))

         if (submission.length === 0) {
    return res.status(400).json({ message: "No test cases created for submission" });
  }


        const submitResult= await submitbatch(submission); // this will return an array of token id now we have to send it to another api to get the result which will return the status of each submission 

        const result=submitResult.map((value)=>value.token);
        // Now we have array of tokens we have to send it to another api to get the result

        const testResult= await submittoken(result);
        // testResult will contain the status of each submission

        for(const test of testResult){
            if(test.status_id!==3){ // 3 means accepted
                return res.status(400).json({message:`Reference solution failed for language ${Language}`});
            }
        }
        }

        // If all reference solutions pass then we can create the problem
        // Logic to save the problem to the database goes here

        const userProblem= await Problem.create({
            ...req.body,
            createdBy:req.userId
        });

        res.status(201).json({ message: "Problem created successfully" });

    }catch(err){
        console.error("Error creating problem:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProblem = async (req, res) => {
    // Logic to update a problem by ID
}

const deleteProblem = async (req, res) => {
    // Logic to delete a problem by ID
}
const solvedProblemsByUser = async (req, res) => {
    // Logic to get solved problems by user
}


export {  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
  solvedProblemsByUser
};