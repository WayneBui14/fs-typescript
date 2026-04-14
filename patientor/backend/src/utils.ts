import { type NewPatient, Gender } from "./types.ts";

// Kiểm tra xem một biến có phải là string không
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

// Kiểm tra giá trị Gender
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

// Hàm Parse chính
const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    if (
      !isString(object.name) ||
      !isString(object.dateOfBirth) ||
      !isString(object.ssn) ||
      !isString(object.occupation) ||
      !isString(object.gender) ||
      !isGender(object.gender)
    ) {
      throw new Error("Incorrect data: some fields are missing or invalid");
    }

    const newEntry: NewPatient = {
      name: object.name,
      dateOfBirth: object.dateOfBirth,
      ssn: object.ssn,
      gender: object.gender,
      occupation: object.occupation,
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
