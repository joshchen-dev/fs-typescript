import { z } from 'zod';

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface Entry {
  
// }

export const EntrySchema = z.object({});
export type Entry = z.infer<typeof EntrySchema>;

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatinet = Omit<Patient, 'ssn' | 'entries'>;

// export interface Patient extends NewPatient {
//   id: string
// }

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  // entries: z.array(EntrySchema)
});

export type NewPatient = z.infer<typeof NewPatientSchema>;