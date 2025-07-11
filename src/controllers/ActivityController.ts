import { Request, Response } from "express";
import BaseController from "./BaseController";
import { IActivity } from "../models/ActivityModel";
import ActivityService from "../services/ActivityService";
import { VerificationStatus } from "../utils/enumHelper";
import { UserRole } from "../models/UserModel";

export class ActivityController extends BaseController<IActivity> {
  private activityService: ActivityService;
  
  constructor() {
    const activityService = new ActivityService();
    super(activityService);
    this.activityService = activityService;
  }

  async create(req: Request, res: Response) {
     req.body.vendorId = (req as any).user;
     if ((req as any).role === UserRole.ADMIN) {
        req.body.verified = VerificationStatus.APPROVED;
     }
     return super.create(req, res);
  }
}
