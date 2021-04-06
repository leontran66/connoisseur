import logger from './logger';

require('dotenv').config();

export const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
export const { AUTH0_AUDIENCE } = process.env;
export const { AUTH0_DOMAIN } = process.env;
export const MONGODB_URI = isProduction ? process.env : process.env.MONGODB_URI_LOCAL;

if (!AUTH0_AUDIENCE) {
  logger.error('No client secret. Set AUTH0_AUDIENCE environment variable.');
  process.exit(1);
}

if (!AUTH0_DOMAIN) {
  logger.error('No client secret. Set AUTH0_DOMAIN environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  if (isProduction) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
  }
  process.exit(1);
}
