import type { NextFunction, Request, Response } from "express";
import express from "express";
import type { NonSensitivePatinet, NewPatient, NewEntry } from "../types.ts";
import { NewPatientSchema } from "../types.ts";
import patientsService from "../services/patients.ts";
import { z } from "zod";

const patientsRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).json({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.get('/', (_req, res: Response<NonSensitivePatinet[]>) => {
  const data = patientsService.getPatients();
  res.send(data);
});

patientsRouter.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response) => {
  try {
    const addedPatient = patientsService.createPatient(req.body);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

patientsRouter.post('/:id/entries', errorMiddleware, (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
  const targetId = req.params.id;
  const a = patientsService.createEntry(targetId, req.body);
  res.json(a);
});

patientsRouter.get('/:id', (req: Request, res: Response<NonSensitivePatinet>) => {
  const patient = patientsService.getPatients().find(p => p.id === req.params.id);
  res.json(patient);
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;