import { NextFunction, Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils";
import { verifyToken } from "../utils/jwt";


const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return ResponseUtils.unauthorized(res, 'unauthorized access');
    }
    const tokenString = token.split(' ')[1];
    if (!tokenString) {
        return ResponseUtils.unauthorized(res, 'unauthorized access');
    }
    const decoded = verifyToken(tokenString);
    (req as any).user = decoded.userId;
    next();
}

export default isAuth;