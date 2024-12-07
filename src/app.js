import express from 'express';
import passport from 'passport';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import challengeRouter from './routes/challengeRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import participationRouter from './routes/participationRouter.js';
import workRouter from './routes/workRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';
import myChallengeRouter from './routes/myChallengeRouter.js';
import notificationRouter from './routes/notificationRouter.js';

import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(passport.initialize());

app.use(express.json());

const corsOptions = {
  origin: ['https://2gi-docthru-3team-fe.vercel.app']
};

app.use(cors(corsOptions));

app.use('/api/auth', userRouter);
app.use('/api/challenges', challengeRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/challenges', participationRouter);
app.use('/api/works', workRouter);
app.use('/api', feedbackRouter);
app.use('/api/me/challenges', myChallengeRouter);
app.use('/api/notifications', notificationRouter);

// 404 Not Found 처리
app.use((req, res) => {
    res.status(404).send({
      message: `The endpoint for '${req.originalUrl}' does not exist`,
    });
  });

// 에러 핸들러 미들웨어 (모든 미들웨어와 라우터 뒤에 위치해야 함)
app.use(errorHandler);

const port = process.env.PORT ?? 3100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});