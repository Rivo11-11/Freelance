import { Request, Response } from 'express';
import User from '../models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AuthController {

     async initiateSignup (req: Request, res: Response) {
        const { method, value } = req.body;
        // const result = await authService.initiateSignup(method, value);
        
    };
    
    async verifySignup (req: Request, res: Response) {
        const { method, value, code } = req.body;
        // const verified = await authService.verifySignup(method, value, code);
        
    };
    
    async completeSignup (req: Request, res: Response) {
        const { name, email, phone, password, profileImage } = req.body;
        // const token = await authService.completeSignup({ name, email, phone, password, profileImage });
        
    };
    
    async signin (req: Request, res: Response) {
        const { method, value, password } = req.body;
        // const token = await authService.signin(method, value, password);
        
    };
    
}