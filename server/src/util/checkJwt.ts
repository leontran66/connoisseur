import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '../config/secrets';

export default jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});
