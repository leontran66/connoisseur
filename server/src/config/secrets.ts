import logger from './logger';

require('dotenv').config();

export const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';
export const { AUTH0_AUDIENCE } = process.env;
export const { AUTH0_CLIENT_ID } = process.env;
export const { AUTH0_CLIENT_SECRET } = process.env;
export const { AUTH0_DOMAIN } = process.env;
export const { AUTH0_MGMT_CLIENT_ID } = process.env;
export const { AUTH0_MGMT_CLIENT_SECRET } = process.env;
export const { AUTH0_USER_ROLE } = process.env;
export const MONGODB_URI = isProduction ? process.env : process.env.MONGODB_URI_LOCAL;

if (!AUTH0_AUDIENCE) {
  logger.error('No Auth0 audience. Set AUTH0_AUDIENCE environment variable.');
  process.exit(1);
}

if (!AUTH0_CLIENT_ID) {
  logger.error('No Auth0 client ID. Set AUTH0_CLIENT_ID environment variable.');
  process.exit(1);
}

if (!AUTH0_CLIENT_SECRET) {
  logger.error('No Auth0 client secret. Set AUTH0_CLIENT_SECRET environment variable.');
  process.exit(1);
}

if (!AUTH0_MGMT_CLIENT_ID) {
  logger.error('No Auth0 management client ID. Set AUTH0_MGMT_CLIENT_ID environment variable.');
  process.exit(1);
}

if (!AUTH0_MGMT_CLIENT_SECRET) {
  logger.error('No Auth0 client secret. Set AUTH0_MGMT_CLIENT_SECRET environment variable.');
  process.exit(1);
}

if (!AUTH0_DOMAIN) {
  logger.error('No Auth0 domain. Set AUTH0_DOMAIN environment variable.');
  process.exit(1);
}

if (!AUTH0_USER_ROLE) {
  logger.error('No Auth0 user role. Set AUTH0_USER_ROLE environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  if (isProduction) {
    logger.error('No MongoDB connection string. Set MONGODB_URI environment variable.');
  } else {
    logger.error('No MongoDB connection string. Set MONGODB_URI_LOCAL environment variable.');
  }
  process.exit(1);
}
