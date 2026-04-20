import patientsData from "../../data/patients.ts";
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
} from "../types.ts";
import { v4 as uuid } from "uuid";
import { EntrySchema } from "../utils.ts";
import { z } from "zod";

const patients: Patient[] = patientsData as Patient[];

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (
  patient: Patient,
  entry: z.infer<typeof EntrySchema>,
): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  } as Entry;
  patient.entries.push(newEntry);
  return newEntry;
};

const getPatientId = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientId,
  addEntry,
};
