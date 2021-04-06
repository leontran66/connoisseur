import { CustomValidator } from 'express-validator';

const isValidPrice: CustomValidator = (value) => {
  if (!value) {
    return true;
  }

  const price = value.replace(/[a-zA-Z ]/g, '');
  if (!Number.isNaN(parseFloat(price))) {
    return true;
  }
  return false;
};

export default isValidPrice;
