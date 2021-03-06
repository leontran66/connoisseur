import morgan from 'morgan';
import logger from './logger';

const stream: morgan.StreamOptions = {
  write: (message) => logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const middleware = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream, skip },
);

export default middleware;
