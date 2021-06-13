# Connoisseur

An app for reviewing restaurants in Brisbane.

## Table of Contents

- [Installation](#installation)
- [Server](#server)
  - [Dependencies](#dependencies)
  - [Database Structure](#database-structure)
    - [User](#user)
    - [Business](#business)
    - [Menu](#menu)
    - [Review](#review)
  - [Routes](#routes)
    - [Business](#business-1)
    - [Menu](#menu-1)
    - [Review](#review-1)
- [Client](#client)
  - [Dependencies](#dependencies-1)
  - [Pages](#pages)

## Installation

1. Copy this repository
2. Install dependencies:

```
cd server
npm install
cd ../client
npm install
```

3. Navigate to the `server` folder
4. Create a `.env` file with the following variables:

```
AUTH0_AUDIENCE=
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
AUTH0_MGMT_CLIENT_ID=
AUTH0_MGMT_CLIENT_SECRET=
AUTH0_USER_ID=
AUTH0_USER_ROLE=
MONGODB_URI=
MONGODB_URI_LOCAL=
NODE_ENV=
```

5. Navigate to the `client` folder
6. Create a `.env` file with the following variables:

```
REACT_APP_AUTH0_AUDIENCE=
REACT_APP_AUTH0_DOMAIN=
REACT_APP_AUTH0_CLIENT_ID=
REACT_APP_AUTH0_CLIENT_SECRET=
REACT_APP_API=
REACT_APP_API_LOCAL=
```

## Server

### Dependencies

[axios](https://github.com/axios/axios) - Makes HTTP requests from Node.js<br />
[cors](https://github.com/expressjs/cors) - Enables CORS<br />
[dotenv](https://github.com/motdotla/dotenv) - Loads environment variables<br />
[express](https://github.com/expressjs/express) - Node web app framework<br />
[express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs<br />
[express-jwt-authz](https://github.com/auth0/express-jwt-authz) - Validates JWT scope<br />
[express-validator](https://github.com/express-validator/express-validator) - Validates and sanitizes input<br />
[helmet](https://github.com/helmetjs/helmet) - Sets various headers for security<br />
[jwks-rsa](https://github.com/auth0/node-jwks-rsa) - Retrieves keys from a JWKS endpoint<br />
[mongoose](https://github.com/Automattic/mongoose) - ODM for MongoDBs<br />
[morgan](https://github.com/expressjs/morgan) - Logs HTTP requests<br />
[winston](https://github.com/winstonjs/winston) - Logging library<br />

### Database Structure

#### User

User authentication and authorization are managed through the [Auth0](https://auth0.com/) platform.

#### Business

| Field         | Type              | Information                                                        |
| ------------- | ----------------- | ------------------------------------------------------------------ |
| user          | Reference to User |                                                                    |
| abn           | String            | Validated as per [ABR](https://abr.business.gov.au/help/abnformat) |
| phone         | String            | Any Australian phone number                                        |
| fax           | String            |                                                                    |
| streetAddress | Boolean           |                                                                    |
| suburb        | Boolean           |                                                                    |
| state         | Boolean           | Any state in AUS                                                   |
| postCode      | Number            | Any QLD postcode                                                   |
| menu          | Array of String   | References to Menu documents                                       |
| reviews       | Array of String   | References to Review documents                                     |

#### Menu

| Field       | Type            | Information |
| ----------- | --------------- | ----------- |
| name        | String          |             |
| category    | String          |             |
| options     | Array of String |             |
| description | String          |             |
| spicy       | Boolean         |             |
| vegetarian  | Boolean         |             |
| vegan       | Boolean         |             |
| vegan       | Number          |             |

#### Review

| Field  | Type              | Information |
| ------ | ----------------- | ----------- |
| user   | Reference to User |             |
| rating | Number            |             |
| review | String            |             |

### Routes

#### Business

| Route                | Action           | Auth          |
| -------------------- | ---------------- | ------------- |
| GET /api/business/me | Get own business | Authenticated |
| POST /api/business   | Create business  | Authenticated |
| PATCH /api/business  | Update business  | Authenticated |
| DELETE /api/business | Delete business  | Authenticated |

##### Menu

| Route                | Action                        | Auth          |
| -------------------- | ----------------------------- | ------------- |
| GET /api/menu/:id    | Get menu item                 |               |
| POST /api/menu       | Create menu item for business | Authenticated |
| PATCH /api/menu/:id  | Update menu item for business | Authenticated |
| DELETE /api/menu/:id | Dlete menu item for business  | Authenticated |

#### Review

| Route              | Action                             | Auth          |
| ------------------ | ---------------------------------- | ------------- |
| POST /api/review   | Create review for user on business | Authenticated |
| DELETE /api/review | Delete review for user on business | Authenticated |

## Client

### Dependencies

[auth0](https://github.com/auth0/auth0-react) - Auth0 SDK for authentication/authorization<br />
[axios](https://github.com/axios/axios) - Makes HTTP requests from Node.js<br />
[bootstrap](https://github.com/twbs/bootstrap) - Adds prebuilt front-end components<br />
[bootstrap-icons](https://github.com/twbs/icons) - Adds bootstrap icons which can be implemented<br />
[dotenv](https://github.com/motdotla/dotenv) - Loads environment variables<br />
[react](https://github.com/facebook/react) - JavaScript library for user interface<br />
[react-router-dom](https://github.com/ReactTraining/react-router) - Adds navigational components for React<br />
[react-spinners](https://github.com/davidhu2000/react-spinners) - Adds loading components for React<br />
[starability](https://github.com/LunarLogic/starability) - Adds stars for ratings

### Pages

| Path             | Information                                                   |
| ---------------- | ------------------------------------------------------------- |
| /                | Landing page with restaurant search                           |
| /menu/new        | Allows users to create menu items for their business          |
| /menu/:id/edit   | Allows users to edit menu items for their business            |
| /profile         | View and change user and business details                     |
| /profile/new     | Allows users to create their business details                 |
| /profile/edit    | Allows users to edit their business details                   |
| /restaurants     | Search for and view restaurants                               |
| /restaurants/:id | View restaurant information, menu and reviews and add reviews |
