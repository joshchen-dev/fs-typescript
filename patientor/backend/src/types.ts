import { z } from 'zod';

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

// export const DiagnosisSchema = z.object({
//   code: z.string(),
//   name: z.string(),
//   latin: z.string().optional()
// });

// export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3
} as const;

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating)
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

export const EntrySchema = z.discriminatedUnion("type", [HealthCheckEntrySchema, HospitalEntrySchema, OccupationalHealthcareEntrySchema]);

export type Entry = z.infer<typeof EntrySchema>;

// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// export type NewEntry = UnionOmit<Entry, "id">;

export const NewEntrySchema = z.discriminatedUnion("type", [
  EntrySchema.options[0].omit({ id: true }),
  EntrySchema.options[1].omit({ id: true }),
  EntrySchema.options[2].omit({ id: true })
]);

export type NewEntry = z.infer<typeof NewEntrySchema>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries?: Entry[]
}

export type NonSensitivePatinet = Omit<Patient, 'ssn' | 'entries'>;

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
  entries: z.array(EntrySchema).optional()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export const PatientSchema = NewPatientSchema.extend({
  id: z.string()
});

export type Patinet = z.infer<typeof PatientSchema>;