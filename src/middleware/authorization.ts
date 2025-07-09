import { NextFunction, Request, Response } from "express";
import User, { UserRole } from "../models/UserModel";
import ResponseUtils from "../utils/responseUtils";


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const id = (req as any).user;
  const user = await User.findById(id);
  if (user?.role !== UserRole.ADMIN) {
    return ResponseUtils.unauthorized(res, 'unauthorized access');
  }
  next();
};

export const isVendor = async (req: Request, res: Response, next: NextFunction) => {
  const id = (req as any).user;
  const user = await User.findById(id);
  if (user?.role === UserRole.USER) {
    return ResponseUtils.unauthorized(res, 'unauthorized access');
  }
  next();
};