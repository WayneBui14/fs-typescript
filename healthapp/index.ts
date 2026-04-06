import express from "express";
import { bmiCalculator } from "./src/bmiCalculator.ts";
import { isNotNumber } from "./src/utils/inputValidator.ts";
import { calculateExercises } from "./src/exerciseCalculator.ts";

const app = express();
app.use(express.json());

app.get("/bmi", (_req, res) => {
  const height = _req.query.height;
  const weight = _req.query.weight;
  const heightNum = Number(height);
  const weightNum = Number(weight);
  if (isNotNumber(height) || isNotNumber(weight) || !weight || !height) {
    return res.json({ error: "Malformatted parameters" });
  }
  const bmiStatus = bmiCalculator(heightNum, weightNum);
  return res.json({ height: heightNum, weight: weightNum, bmi: bmiStatus });
});

app.post("/exercises", (_req, res) => {
  const target = _req.body.target;
  const daily_exercises = _req.body.daily_exercises;
  if (!target || !daily_exercises) {
    return res.json({ error: "Missing parameters" });
  }
  const isInvalidExercises =
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((h) => isNotNumber(Number(h)));
  if (isInvalidExercises || isNotNumber(target)) {
    return res.json({ error: "Malformatted parameters" });
  }
  const result = calculateExercises(
    Number(target),
    daily_exercises.map(Number),
  );
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
