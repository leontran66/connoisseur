import winston, { format } from 'winston';

const options: winston.LoggerOptions = {
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  levels: winston.config.npm.levels,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}.`),
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

export default logger;
