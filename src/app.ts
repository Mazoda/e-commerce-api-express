import express from 'express';
import 'dotenv/config';
import apiRouter from './routes/index.js';

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

export default app;
