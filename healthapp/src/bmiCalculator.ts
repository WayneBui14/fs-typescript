import { isNotNumber } from "./utils/inputValidator";

const bmiCalculator = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  switch (true) {
    case bmi < 18.5:
      return "Underweight range";
    case bmi < 25:
      return "Normal range";
    case bmi < 30:
      return "Overweight range";
    default:
      return "Obesity range";
  }
};

try {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error("Both height and weight must be numbers");
  }
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
