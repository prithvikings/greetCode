import express from 'express';
import { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem, solvedProblemsByUser } from '../controllers/problem.controllers.js';
import { checkAdmin } from '../middlewares/admin.middleware.js';
import { checkAuth } from '../middlewares/auth.middleware.js';
export const problemRouter = express.Router();

//admin access
problemRouter.post("/create",checkAdmin,createProblem);
problemRouter.patch("/update/:id",checkAdmin,updateProblem);
problemRouter.delete("/delete/:id",checkAdmin,deleteProblem);


//user access
problemRouter.get("/getAllProblem",checkAuth ,getAllProblems);
problemRouter.get("/getProblemById/:id",checkAuth ,getProblemById);
problemRouter.get("/problemSolvedByUser",checkAuth ,solvedProblemsByUser);

