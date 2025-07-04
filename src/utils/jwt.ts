import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret'; 
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1h'; 

export const generateToken = (payload: JwtPayload): { token: string, expiresIn: string } => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return { token, expiresIn: JWT_EXPIRES_IN };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
