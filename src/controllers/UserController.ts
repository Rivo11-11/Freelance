import { Request, Response } from "express";
import UserService from "../services/UserService";
import BaseController from "./BaseController";
import ResponseUtils from "../utils/responseUtils";
import { IUser } from "../models/UserModel";

export class UserController extends BaseController<IUser> {
  private userService: UserService;
  
  constructor() {
    const userService = new UserService();
    super(userService);
    this.userService = userService;
  }

  async getUserByEmail(req: Request, res: Response) {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return ResponseUtils.notFound(res, 'User not found');
      }
      return ResponseUtils.success(res, user);
    }

  async getUsersByRole(req: Request, res: Response) {
    const { role } = req.params;
    const users = await this.userService.getUsersByRole(role);
    return ResponseUtils.success(res, users);
  }
}