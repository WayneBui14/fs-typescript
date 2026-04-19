export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  ssn: string;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
