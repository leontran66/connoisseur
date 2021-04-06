import mongoose from 'mongoose';
import app from './app';
import mongoDB from './util/mongoDB';
import logger from './config/logger';

mongoDB.connect();

mongoose.connection.on('connected', () => {
  app.listen(app.get('port'), () => {
    logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')}`);
  });
});

process.on('SIGINT', () => mongoDB.exit()).on('SIGTERM', () => mongoDB.exit());
