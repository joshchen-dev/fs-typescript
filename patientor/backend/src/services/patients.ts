import patientsData from '../../data/patients.ts';
import { v1 as uuid } from 'uuid';
import { NewPatientSchema, type NewPatient, type Patient } from '../types.ts';

const getEntries = (): Omit<Patient, 'ssn'>[] => {
  return  patientsData.map((obj) => {
    const sensitiveSchema = NewPatientSchema.omit({ ssn: true });
    const validated = sensitiveSchema.parse(obj);

    return {
      ...validated,
      id: obj.id
    };
  });
};

const createEntry = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    ...entry,
    id: uuid()
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  createEntry
};