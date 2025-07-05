import UserModel, { IUser } from '../models/UserModel';
import BaseService from './BaseService';

export default class UserService extends BaseService<IUser> {
  constructor() {
    super(UserModel);
  }

  // // User-specific methods
  // async getUserByEmail(email: string): Promise<IUser | null> {
  //   return this.findOne({ email });
  // }

  // async getUserByPhone(phone: string): Promise<IUser | null> {
  //   return this.findOne({ phone });
  // }

  // async getUsersByRole(role: string): Promise<IUser[]> {
  //   return this.findMany({ role });
  // }

  // // Override create method to add user-specific logic
  // async createUser(data: Partial<IUser>): Promise<IUser> {
  //   // Add any user-specific validation or business logic here
  //   return this.create(data);
  // }
}