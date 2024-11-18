import express from 'express';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/users', userRouter);