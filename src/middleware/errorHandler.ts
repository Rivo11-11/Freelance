import { Request, Response, NextFunction } from 'express';
import ResponseUtils from '../utils/responseUtils';
import CustomError from '../utils/errorUtils';
export const globalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  switch (error.name) {
    case "MulterError":
      return ResponseUtils.unprocessableEntity(res, error.name);
    default:
      return ResponseUtils.error(res, error.code, error.message);
  }
}; 