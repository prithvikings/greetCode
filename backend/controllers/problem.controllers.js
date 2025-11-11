import {getLanguageId,submitbatch} from '../utils/languageUtils.js';

const getAllProblems = async (req, res) => {
    // Logic to get all problems
}

const getProblemById = async (req, res) => {
    // Logic to get a problem by ID
}

const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases,startCode,referenceSolution, timeLimit, memoryLimit, createdBy } = req.body;

    try{
        for(const {Language,completecode} of referenceSolution){

            const languageId=getLanguageId(Language);

            const submission=visibleTestCases.map((input,output)=>({
            source_code:completecode,
            language_id:languageId,
            stdin:input,
            expected_output:output
        }))


        const submitResult= await submitbatch(submission);
        }




        
        
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