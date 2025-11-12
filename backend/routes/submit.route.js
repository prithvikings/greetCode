import express from 'express';
import { submitController,runController } from '../controllers/submit.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

export const submitRouter = express.Router();

submitRouter.post('/submit/:id', checkAuth,submitController);
submitRouter.post('/run/:id', checkAuth,runController);