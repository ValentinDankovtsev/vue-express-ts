import { NextFunction, Request, Response } from 'express';
import { ErrorDetail, HttpException } from '@exceptions/httpException';
import { logger } from '@utils/logger';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const errors: ErrorDetail[] | string = error.errors || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${JSON.stringify(errors)}`);
    res.status(status).json({ errors });
  } catch (error) {
    next(error);
  }
};
