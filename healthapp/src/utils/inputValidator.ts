interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

export const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }
  if (isNaN(Number(args[2]))) {
    throw new Error("Target value must be a number");
  }
  const daily_exercises = args.slice(3).map((v) => {
    if (isNaN(Number(v))) {
      throw new Error("All exercise values must be numbers");
    }
    return Number(v);
  });
  return {
    target: Number(args[2]),
    daily_exercises,
  };
};

export const isNotNumber = (argument: any): boolean => {
  return isNaN(Number(argument));
};
