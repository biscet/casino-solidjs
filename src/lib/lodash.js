export const isEmpty = (obj) =>
  [Object, Array].includes((obj || {}).constructor) &&
  Object.entries(obj || {}).length === 0;

export const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const getUniqueOptions = (options) => {
  return options.reduce(
      (res, cur) =>
          res.find((find) => JSON.stringify(find) === JSON.stringify(cur))
              ? res
              : [...res, cur],
      []
  )
};