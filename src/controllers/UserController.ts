import { Request, Response } from "express";
import UserService from "../services/UserService";
import ResponseUtils from "../utils/responseUtils";

export class UserController {
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService();
  }

  async getAll(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    return ResponseUtils.success(res, users);
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.createUser(req.body);
    return ResponseUtils.success(res, user);  
  }
}