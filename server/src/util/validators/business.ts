import { CustomValidator } from 'express-validator';

const weightingFactors = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

export const isABN: CustomValidator = (value) => {
  const abn = value.replace(/ /g, '');
  const digits = [...abn];
  let sum = 0;
  let position = 0;
  digits.forEach((digit) => {
    let weightDigit = 0;
    if (position === 0) {
      weightDigit = (parseInt(digit, 10) - 1) * weightingFactors[position];
    } else {
      weightDigit = parseInt(digit, 10) * weightingFactors[position];
    }
    sum += weightDigit;
    position += 1;
  });
  const remainder = sum / 89;
  if (remainder % 1 !== 0) {
    return false;
  }
  return true;
};

export function isAddress(
  streetAddress: string,
  suburb: string,
  state: string,
  postCode: string,
): Array<Object> {
  const message: Array<Object> = [];
  const emptyFields = [];
  if ((!streetAddress && !suburb && !state && !postCode)
    || (streetAddress && suburb && state && postCode)) {
    return [];
  }
  if (!streetAddress) emptyFields.push({ input: 'Street Address', field: 'streetAddress' });
  if (!suburb) emptyFields.push({ input: 'Suburb', field: 'suburb' });
  if (!state) emptyFields.push({ input: 'State', field: 'state' });
  if (!postCode) emptyFields.push({ input: 'Postcode', field: 'postCode' });
  if (emptyFields.length > 0) {
    emptyFields.forEach((field) => {
      const error = {
        msg: `${field.input} is required when entering an address.`,
        param: field.field,
      };
      message.push(error);
    });
  }
  return message;
}

export const isNumber: CustomValidator = (value) => {
  if (!value) {
    return true;
  }
  const number = value.replace(/ /g, '');
  const isFree = number.length === 10 && number.slice(0, 4) === '1800';
  const isLocalShort = number.length === 6 && number.slice(0, 2) === '13';
  const isLocalLong = number.length === 10 && number.slice(0, 4) === '1300';
  const isMobile = number.length === 10 && number.slice(0, 2) === '04';
  const isPhone = number.length === 8 && (number.slice(0, 1) === '2' || number.slice(0, 1) === '3');
  if (isFree || isLocalShort || isLocalLong || isMobile || isPhone) {
    return true;
  }
  return false;
};

export const isPostCode: CustomValidator = (value) => {
  if (!value) {
    return true;
  }
  if (value.length === 4 && (value.slice(0, 1) === '4' || value.slice(0, 1) === '9')) {
    return true;
  }
  return false;
};

export const isState: CustomValidator = (value) => {
  if (!value) {
    return true;
  }
  const states = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'];
  if (states.some((state) => state === value)) {
    return true;
  }
  return false;
};
