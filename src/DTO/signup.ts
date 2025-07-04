import { UserRole } from "../models/UserModel";

export interface SignupDTO {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
    profileImage?: string;
}