import express from 'express';
import { urlencoded, json } from 'body-parser';

import movieRouter from './routes/movie-router';
import on from './db/'
const app = express();
const apiPort = 3000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.use('/api', movieRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));