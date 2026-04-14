import patientsData from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import type { NonSensitivePatinet, NewPatient, Patient, Entry } from '../types.ts';
import { NewPatientSchema } from '../types.ts';

const getEntries = (): NonSensitivePatinet[] => {
  return patientsData.map((obj) => {
    const sensitiveSchema = NewPatientSchema.omit({ ssn: true });
    const validated = sensitiveSchema.parse(obj);

    return {
      ...validated,
      id: obj.id,
      entries: obj.entries
    };
  });
};

const createEntry = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuid(),
    entries: [] as Entry[]
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  createEntry
};