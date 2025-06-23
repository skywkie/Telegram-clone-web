const getRandomNumber = (min: number, max: number): number => {
  const random = min + Math.random() * (max + 1 - min);
  if (random == 0) {
    return getRandomNumber(min, max);
  }
  return Math.floor(random);
};

export default getRandomNumber;
