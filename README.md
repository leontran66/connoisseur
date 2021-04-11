# Connoisseur

An app for reviewing restaurants in Brisbane.

## Installation

1. Copy this repository
2. Install dependencies:

```
cd server
npm install
```

3. Navigate to the `server` folder
4. Create a `.env` file and add the following variables:

```
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
MONGODB_URI=
MONGODB_URI_LOCAL=
NODE_ENV=
```

5. Run the app in development:

```
npm run dev
```

or in production:

```
npm run build
npm run serve
```

## Server

### Dependencies

[cors](https://github.com/expressjs/cors) - Enables CORS<br />
[dotenv](https://github.com/motdotla/dotenv) - Loads environment variables<br />
[express](https://github.com/expressjs/express) - Node web app framework<br />
[express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs<br />
[express-jwt-authz](https://github.com/auth0/express-jwt-authz) - Validates JWT scope<br />
[helmet](https://github.com/helmetjs/helmet) - Sets various headers for security<br />
[jwks-rsa](https://github.com/auth0/node-jwks-rsa) - Retrieves keys from a JWKS endpoint<br />
[mongoose](https://github.com/Automattic/mongoose) - ODM for MongoDBs<br />
[morgan](https://github.com/expressjs/morgan) - Logs HTTP requests<br />
[winston](https://github.com/winstonjs/winston) - Logging library<br />

## Client

### Dependencies

[auth0](https://github.com/auth0/auth0-react) - Auth0 SDK for authentication/authorization
[bootstrap](https://github.com/twbs/bootstrap) - Adds prebuilt front-end components<br />
[dotenv](https://github.com/motdotla/dotenv) - Loads environment variables<br />
[react](https://github.com/facebook/react) - JavaScript library for user interface<br />
[react-router-dom](https://github.com/ReactTraining/react-router) - Adds navigational components for React<br />
[react-spinners](https://github.com/davidhu2000/react-spinners) - Adds loading components for React<br />
