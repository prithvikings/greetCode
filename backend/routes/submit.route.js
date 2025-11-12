import express from 'express';
import { submitController } from '../controllers/submit.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

export const submitRouter = express.Router();

submitRouter.post('/submit/:id', checkAuth,submitController);