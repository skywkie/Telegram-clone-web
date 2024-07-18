const getRandomNumber = (min: number, max: number): number => {
  // случайное число от min до (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  if (rand == 0) {
    return getRandomNumber(min, max);
  }
  return Math.floor(rand);
};

export default getRandomNumber;
