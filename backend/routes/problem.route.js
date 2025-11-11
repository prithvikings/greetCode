import express from 'express';
import { getAllProblems, getProblemById, createProblem, updateProblem, deleteProblem, solvedProblemsByUser } from '../controllers/problem.controllers.js';
import { checkAdmin } from '../middlewares/admin.middleware.js';
export const problemRouter = express.Router();

//admin access
problemRouter.post("/create",checkAdmin,createProblem);
problemRouter.patch("/:id",checkAdmin,updateProblem);
problemRouter.delete("/:id",checkAdmin,deleteProblem);


//user access
problemRouter.get("/",getAllProblems);
problemRouter.get("/:id",getProblemById);
problemRouter.get("/user",solvedProblemsByUser);

