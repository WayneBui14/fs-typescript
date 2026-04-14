import express from "express";
import patientService from "../services/patientService.ts";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  const { name, dateOfBirth, gender, ssn, occupation } = _req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  });
  res.json(newPatient);
});

export default router;
