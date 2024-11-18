import express from 'express';
import userRouter from './routes/userRouter.js';
import challengeRouter from './routes/challengeRouter.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:3100'],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/users', userRouter);
app.user('/api/challenges', challengeRouter);

app.listen(process.env.PORT || 3100, () => console.log("Server Started"));