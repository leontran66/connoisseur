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
import setUserRole from './controllers/user';

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 5000);
app.set('env', NODE_ENV || 'development');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet(helmetOptions));
app.use(morgan);

if (NODE_ENV === 'production') {
  app.get('/api/business/me', checkJwt, scopes(['read:business']), business.getOwnBusiness);
  app.post('/api/business', checkJwt, scopes(['write:business']), business.createBusiness);
  app.patch('/api/business', checkJwt, scopes(['write:business']), business.updateBusiness);
  app.delete('/api/business', checkJwt, scopes(['write:business']), business.deleteBusiness);
  app.get('/api/menu/:id', checkJwt, scopes(['read:menu']), menu.getMenu);
  app.post('/api/menu', checkJwt, scopes(['write:menu']), menu.createMenu);
  app.patch('/api/menu/:id', checkJwt, scopes(['write:menu']), menu.updateMenu);
  app.delete('/api/menu/:id', checkJwt, scopes(['write:menu']), menu.deleteMenu);
  app.post('/api/review', checkJwt, scopes(['write:reviews']), review.createReview);
  app.delete('/api/review/:id', checkJwt, scopes(['write:reviews']), review.deleteReview);
} else {
  app.get('/api/business/me', business.getOwnBusiness);
  app.post('/api/business', business.createBusiness);
  app.patch('/api/business', business.updateBusiness);
  app.delete('/api/business', business.deleteBusiness);
  app.get('/api/menu/:id', menu.getMenu);
  app.post('/api/menu', menu.createMenu);
  app.patch('/api/menu/:id', menu.updateMenu);
  app.delete('/api/menu/:id', menu.deleteMenu);
  app.post('/api/review', review.createReview);
  app.delete('/api/review/:id', review.deleteReview);
}
app.get('/api/business', business.getAllBusinesses);
app.get('/api/business/:id', business.getBusiness);
app.post('/api/user', setUserRole);

app.use(errorHandler);

export default app;
