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
console.log(bmiCalculator(180, 74));
