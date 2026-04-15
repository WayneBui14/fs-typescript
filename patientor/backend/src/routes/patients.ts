import express from "express";
import patientService from "../services/patientService.ts";
import { NewPatientSchema } from "../utils.ts";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
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

export default router;
