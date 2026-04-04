import express from "express";
import { bmiCalculator } from "./src/bmiCalculator.ts";
import { isNotNumber } from "./src/utils/inputValidator.ts";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
