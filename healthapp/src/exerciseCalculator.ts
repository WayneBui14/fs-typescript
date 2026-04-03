import { parseArguments } from "./utils/inputValidator";
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  daily_exercises: number[],
  target: number,
): Result => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((day) => day > 0).length;
  const success = trainingDays >= target;
  const rating = trainingDays / periodLength;
  const ratingDescription =
    rating >= 0.5 ? "Good job" : "Not too bad but could be better";
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
  const { target, daily_exercises } = parseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
