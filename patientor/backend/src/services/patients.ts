import patientsData from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type { NewPatient, Patient, Entry, NewEntry } from '../types.ts';
import { NewEntrySchema, PatientSchema } from '../types.ts';

const getPatients = (): Patient[] => {
  return patientsData.map((obj) => PatientSchema.parse(obj));
};

const createPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    ...patient,
    id: uuid(),
    entries: [] as Entry[]
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const createEntry = (patientId: string, entry: NewEntry): Patient => {
  const targetPatinet = patientsData.find(p => p.id === patientId);

  if (!targetPatinet) {
    throw new Error('target patinet not found');
  }

  const validated = NewEntrySchema.parse(entry);
  const newEntry = {
    ...validated,
    id: uuid()
  };
  targetPatinet.entries = targetPatinet.entries.concat(newEntry);

  return targetPatinet;
};

export default {
  getPatients,
  createPatient,
  createEntry
};