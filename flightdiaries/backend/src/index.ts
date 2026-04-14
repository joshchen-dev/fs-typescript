import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries.ts';

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});