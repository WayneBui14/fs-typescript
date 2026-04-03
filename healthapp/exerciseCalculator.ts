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
console.log(calculateExercises([1, 1, 2, 0, 3, 0, 2], 1));
