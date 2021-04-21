/// <reference path="./types/request.d.ts" />
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import corsOptions from './config/corsOptions';
import helmetOptions from './config/helmetOptions';
import morgan from './config/morgan';
import checkJwt from './util/checkJwt';
import scopes from './util/scopes';
import { NODE_ENV } from './config/secrets';

import errorHandler from './util/errorHandler';
import * as business from './controllers/business';
import * as menu from './controllers/menu';
import * as review from './controllers/review';

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 5000);
app.set('env', NODE_ENV || 'development');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet(helmetOptions));
app.use(morgan);

if (NODE_ENV !== 'test') {
  app.use(checkJwt);
}

app.get('/api/business', business.getAllBusinesses);
app.get('/api/business/me', scopes(['read:business']), business.getOwnBusiness);
app.get('/api/business/:id', scopes(['read:business']), business.getBusiness);
app.post('/api/business', scopes(['write:business']), business.createBusiness);
app.patch('/api/business', scopes(['write:business']), business.updateBusiness);
app.delete('/api/business', scopes(['write:business']), business.deleteBusiness);
app.get('/api/menu/:id', scopes(['read:menu']), menu.getMenu);
app.post('/api/menu', scopes(['write:menu']), menu.createMenu);
app.patch('/api/menu/:id', scopes(['write:menu']), menu.updateMenu);
app.delete('/api/menu/:id', scopes(['write:menu']),  menu.deleteMenu);
app.post('/api/review', scopes(['write:reviews']), review.createReview);
app.delete('/api/review/:id', scopes(['write:reviews']), review.deleteReview);

app.use(errorHandler);

export default app;
