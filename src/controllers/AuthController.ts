import { Request, Response } from 'express';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthService from '../services/AuthService';
import ResponseUtils from '../utils/responseUtils';
import { SignupMethod } from '../utils/enumHelper';
import { SignupDTO } from '../DTO/signup';
import { SigninDTO } from '../DTO/signin';

export default class AuthController {

    async initiateSignup(req: Request, res: Response) {
        const { method, value } = req.body;
        const result = await AuthService.initiateSignup(method, value);
        return ResponseUtils.success(res, result);
    };

    async verifySignup(req: Request, res: Response) {
        const { method, value, code } = req.body;
        // const verified = await authService.verifySignup(method, value, code);

    };

    async completeSignup(req: Request, res: Response) {
        const signupDTO: SignupDTO = req.body; 
        const result = await AuthService.signup(signupDTO);
        return ResponseUtils.success(res, result);

    };

    async signin(req: Request, res: Response) {
        const signinDTO: SigninDTO = req.body;
        const result = await AuthService.signin(signinDTO);
        return ResponseUtils.success(res, result);

    };

}