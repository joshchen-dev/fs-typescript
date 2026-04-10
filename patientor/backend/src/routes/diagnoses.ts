import type { Response } from 'express';
import express from 'express';
import DiagnosesService from '../services/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  const data = DiagnosesService.getEntries();
  res.send(data);
});

export default diagnosesRouter;