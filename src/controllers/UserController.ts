import { Request, Response } from "express";
import UserService from "../services/UserService";
import BaseController from "./BaseController";
import { IUser } from "../models/UserModel";

export class UserController extends BaseController<IUser> {
  private userService: UserService;
  
  constructor() {
    const userService = new UserService();
    super(userService);
    this.userService = userService;
  }

  // User-specific endpoints
  // async getUserByEmail(req: Request, res: Response) {
  //   try {
  //     const { email } = req.params;
  //     const user = await this.userService.getUserByEmail(email);
      
  //     if (!user) {
  //       return ResponseUtils.notFound(res, 'User not found');
  //     }
      
  //     return ResponseUtils.success(res, user);
  //   } catch (error) {
  //     return ResponseUtils.error(res, 500, error);
  //   }
  // }

  // async getUsersByRole(req: Request, res: Response) {
  //   try {
  //     const { role } = req.params;
  //     const users = await this.userService.getUsersByRole(role);
  //     return ResponseUtils.success(res, users);
  //   } catch (error) {
  //     return ResponseUtils.error(res, 500, error);
  //   }
  // }

  // // Override create method to use user-specific service method
  // async create(req: Request, res: Response) {
  //   try {
  //     const user = await this.userService.createUser(req.body);
  //     return ResponseUtils.success(res, user);
  //   } catch (error) {
  //     return ResponseUtils.error(res, 500, error);
  //   }
  // }
}