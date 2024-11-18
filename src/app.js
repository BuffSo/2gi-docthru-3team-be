import express from 'express';
// import userRouter from './routes/userRouter.js';
import challengeRouter from './routes/challengeRouter.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    // origin: ['http://localhost:3100'],
    origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

// app.use('/api/users', userRouter);
app.use('/api/challenges', challengeRouter);

app.listen(process.env.PORT || 3100, () => console.log("Server Started"));