import { NextFunction, Request, Response } from "express";
import ResponseUtils from "../utils/responseUtils";
import { verifyToken } from "../utils/jwt";


const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        return ResponseUtils.unauthorized(res, 'unauthorized access token is required');
    }
    const tokenString = token.split(' ')[1];
    if (!tokenString) {
        return ResponseUtils.unauthorized(res, 'unauthorized access token is required');
    }
    const decoded = verifyToken(tokenString);
    (req as any).user = decoded.userId;
    (req as any).role = decoded.role;
    next();
}

export default isAuth;