import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

type Error = {
  message: string;
  stack: string;
  status: number;
}

// eslint-disable-next-line no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  logger.error(err.stack);
  return res.status(err.status).json({ message: err.message });
};
