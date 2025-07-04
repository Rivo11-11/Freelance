import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ResponseUtils from '../utils/responseUtils';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return ResponseUtils.unprocessableEntity(res, errors.array().map(err => err.msg));
  }
  next();
};