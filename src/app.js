import express from 'express';
import passport from 'passport';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import challengeRouter from './routes/challengeRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import participationRouter from './routes/participationRouter.js';
import workRouter from './routes/workRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use(passport.initialize());
//app.use(passport.session());

const corsOptions = {
    origin: [
    'http://localhost:3000', 
    'http://localhost:3001'
    ],
};
app.use(cors(corsOptions));

app.use('/api/auth', userRouter);
app.use('/api/challenges', challengeRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/challenges', participationRouter);
app.use('/api/works', workRouter);
app.use('/api', feedbackRouter);

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