interface BmiInput {
  height: number,
  mass: number
}

const parseBmi = (args: string[]): BmiInput => {
  if (args.length !== 4) {
    throw new Error('Exactly 2 arguments should be passed');
  }

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Please pass values of type number');
  }

  return {
    height: Number(args[2]),
    mass: Number(args[3])
  };
};

export const calculateBmi = (height: number, mass: number): string => {
  height /= 100;
  const BMI = mass / (height * height);
  let res: string;

  if (height === 0) {
    throw new Error('height cannot be 0!');
  }

  if (BMI > 25) {
    res = 'Overweight';
  } else if (BMI < 18.5) {
    res = 'Underweight';
  } else {
    res = 'Normal range';
  }

  return res;
};

// won't run when function is imported
if (process.argv[1] === import.meta.filename) {
  const { height, mass } = parseBmi(process.argv);
  
  console.log(calculateBmi(height, mass));
}