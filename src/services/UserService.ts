import UserModel from '../models/UserModel';

export default class UserService {
  async getAllUsers() {
    return UserModel.find();
  }

  async createUser(data: any) {
    const user = new UserModel(data);
    return user.save();
  }
} 