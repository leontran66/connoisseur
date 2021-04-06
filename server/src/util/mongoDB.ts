import mongoose from 'mongoose';
import logger from '../config/logger';
import { MONGODB_URI } from '../config/secrets';

const connect = () => {
  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI.toString(), {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }).then(() => {
      logger.info('MongoDB connection established');
    }).catch((err) => {
      logger.error(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
      process.exit(1);
    });
  }
};

const exit = () => {
  mongoose.connection.close(() => {
    logger.info('MongoDB connection closed');
    process.exit(0);
  });
};

export default {
  connect,
  exit,
};
