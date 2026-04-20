import express from "express";
import patientService from "../services/patientService.ts";
import { NewPatientSchema, EntrySchema } from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientId(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found." });
  }
});

router.post("/", (req, res) => {
  try {
    // Zod thực hiện parse và validate dữ liệu cùng lúc
    const newPatient = NewPatientSchema.parse(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "Something went wrong." });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.getPatientId(req.params.id);
    if (!patient) {
      res.status(404).send({ error: "Patient not found." });
    }
    const newEntry = EntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(500).send({ error: "Internal server error" });
    }
  }
});

export default router;
