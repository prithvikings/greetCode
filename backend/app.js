import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {ENV} from './config/env.js';
import {userRoutes} from './routes/user.route.js';
import { problemRouter } from './routes/problem.route.js';
import { submitRouter } from './routes/submit.route.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
}));


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.use('/api/auth/users/', userRoutes);
app.use("/api/auth/problem/",problemRouter);
app.use("/api/auth/problem/",submitRouter);

export default app;