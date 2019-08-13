import express from 'express';
import { urlencoded, json } from 'body-parser';
import cookieParser from 'cookie-parser';

import on from './db/'
import movieRouter from './routes/movie';
import userRouter from './routes/user';

const app = express();
const apiPort = process.env.PORT || 3001;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.use('/api', movieRouter);
app.use('/api/users', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));