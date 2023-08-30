export const randomNumber = (forNumber) => {
  return Math.floor(Math.random() * (forNumber + 1));
};

export const randomCrashPointer = (forNumber) => {
  const toComma = randomNumber(forNumber);
  const afterComma = randomNumber(99);
  return Number(`${toComma}.${afterComma}`);
};
