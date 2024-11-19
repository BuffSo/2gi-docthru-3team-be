import express from 'express';
import passport from 'passport';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import challengeRouter from './routes/challengeRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(passport.initialize());
app.use(express.json());

const corsOptions = {
    origin: [
    'http://localhost:3000', 
    'http://localhost:3001'
    ],
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api/auth', userRouter);
app.use('/api/challenges', challengeRouter);

// 404 Not Found 처리
app.use((req, res) => {
    res.status(404).send({
      message: `The endpoint for '${req.originalUrl}' does not exist`,
    });
  });

// 에러 핸들러 미들웨어 (모든 라우트 뒤에 위치해야 함)
app.use(errorHandler);

const port = process.env.PORT ?? 3100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});