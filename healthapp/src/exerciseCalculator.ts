import { parseArguments } from "./utils/inputValidator.ts";
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  daily_exercises: number[],
): Result => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((day) => day > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  let rating: number;
  let ratingDescription: string;
  if (average < target) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else if (average === target) {
    rating = 1;
    ratingDescription = "Good job";
  } else {
    rating = 3;
    ratingDescription = "Excellent";
  }
  const success = average >= target;
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

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, daily_exercises } = parseArguments(process.argv);
    console.log(calculateExercises(target, daily_exercises));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
