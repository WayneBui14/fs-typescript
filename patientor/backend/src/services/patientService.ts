import patientsData from "../../data/patients.ts";
import type { Patient, NonSensitivePatient, NewPatient } from "../types.ts";
import { v4 as uuid } from "uuid";

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

const getPatientId = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

export default {
  getNonSensitiveEntries,
  addPatient,
  getPatientId,
};
