import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import corsOptions from './config/corsOptions';
import morgan from './config/morgan';
import { NODE_ENV } from './config/secrets';

import errorHandler from './util/errorHandler';
import * as business from './controllers/business';
import * as menu from './controllers/menu';
import * as review from './controllers/review';

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', NODE_ENV || 'development');
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan);

app.get('/api/business', business.getAllBusinesses);
app.get('/api/business/:id', business.getBusiness);
app.post('/api/business', business.createBusiness);
app.patch('/api/business/:id', business.updateBusiness);
app.delete('/api/business/:id', business.deleteBusiness);
app.post('/api/menu', menu.createMenu);
app.patch('/api/menu/:id', menu.updateMenu);
app.delete('/api/menu/:id', menu.deleteMenu);
app.post('/api/review', review.createReview);
app.patch('/api/review/:id', review.updateReview);
app.delete('/api/review/:id', review.deleteReview);

app.use(errorHandler);

export default app;
