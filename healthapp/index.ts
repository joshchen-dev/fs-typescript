import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { exerciseCalculator } from './exerciseCalculator.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (height === undefined || weight === undefined) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const content = calculateBmi(Number(height), Number(weight));

  res.send({
    height: Number(height),
    weight: Number(weight),
    bmi: content
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  if (!('daily_exercises' in req.body) || !('target' in req.body)) {
    res.status(200).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const stats = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = req.body.target;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  stats.map((e: unknown) => Number(e));

  if (!stats || !target) {
    res.status(200).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (stats.some((e: number) => isNaN(e)) || isNaN(Number(target))) {
    res.status(200).json({ error: 'malformatted parameters' });
  }

  const content = exerciseCalculator(stats as number[], target as number);

  res.send(content);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
