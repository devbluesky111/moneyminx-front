export const isNumber = (x: any): x is number => typeof x === 'number';

export const isString = (x: any): x is string => typeof x === 'string';

export const fNumber = (num: number | string) => {
  if (isString(num)) {
    return Number.parseFloat(num).toFixed(2);
  }

  return num.toFixed(2);
};
