import { Request, Response, NextFunction } from 'express';
import ResponseUtils from '../utils/responseUtils';
import CustomError from '../utils/errorUtils';
export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return ResponseUtils.error(res, error.code, error.message);
}; 