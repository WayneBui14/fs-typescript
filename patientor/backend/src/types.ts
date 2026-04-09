export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // Dấu '?' vì trường này có thể không có
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  ssn: string;
  occupation: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn">;
