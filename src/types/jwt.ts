import { UserRole } from "../models/UserModel";

export interface JwtPayload {
    userId: string;
    role: UserRole;   
    email?: string;
    phone?: string;
  }
  