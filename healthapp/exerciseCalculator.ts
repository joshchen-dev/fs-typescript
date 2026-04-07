export interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface Rating {
  value: number,
  description: string
}

export interface CalculatorInput {
  target: number,
  stats: number[]
}

const parseCalculator = (args: string[]): CalculatorInput => {
  if (args.length < 4) {
    throw new Error('Need at least 2 arguments');
  }

  const data = args.slice(2).map(Number);

  if (data.some(e => isNaN(e))) {
    throw new Error('Only values of type number should be passed in');
  }

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Please pass values of type number');
  }

  return {
    target: data[0],
    stats: data.slice(1)
  };
};

export const exerciseCalculator = (stats: number[], target: number): ExerciseResult => {
  const periodLength = stats.length;
  const trainingDays = stats.reduce((a, b) => a + Number(b > 0), 0);
  const totalExerciseHours = stats.reduce((a, b) => a + b);
  const average = totalExerciseHours / periodLength;
  const success = average >= target;

  let rating: Rating;

  if (average < target * 0.8) {
    rating = {
      value: 1,
      description: 'comne on, you can do it!'
    };
  } else if (average <= target * 1.2) {
    rating = {
      value: 2,
      description: 'not too bad but could be better'
    };
  } else {
    rating = {
      value: 3,
      description: 'well done, lad!'
    };
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating: rating.value,
    ratingDescription: rating.description,
    target,
    average
  };
};

if (process.argv[1] === import.meta.filename) {
  const { target, stats } = parseCalculator(process.argv);

  console.log(exerciseCalculator(stats, target));
}