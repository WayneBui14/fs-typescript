import express from "express";
import { bmiCalculator } from "./src/bmiCalculator.ts";
import { isNotNumber } from "./src/utils/inputValidator.ts";
import { calculateExercises } from "./src/exerciseCalculator.ts";

const app = express();
app.use(express.json());

interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const height = _req.query.height;
  const weight = _req.query.weight;
  const heightNum = Number(height);
  const weightNum = Number(weight);
  if (isNotNumber(height) || isNotNumber(weight) || !weight || !height) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmiStatus = bmiCalculator(heightNum, weightNum);
  return res.json({ height: heightNum, weight: weightNum, bmi: bmiStatus });
});

app.post("/exercises", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises }: ExerciseValues = _req.body;
  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  }
  const isInvalidExercises =
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((h) => isNotNumber(Number(h)));
  if (isInvalidExercises || isNotNumber(target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const result = calculateExercises(
    Number(target),
    daily_exercises.map(Number),
  );
  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
