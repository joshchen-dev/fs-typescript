import type { NextFunction, Request, Response } from "express";
import express from "express";
import { NewPatientSchema, type Patient, type NewPatient } from "../types.ts";
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
    res.status(400).send({ error: error.message});
  } else {
    next(error);
  }
};

patientsRouter.get('/', (_req, res: Response<Omit<Patient, "ssn">[]>) => {
  const data = patientsService.getEntries();
  res.send(data);
});

patientsRouter.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response) => {
  try {
    const addedEntry = patientsService.createEntry(req.body);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;