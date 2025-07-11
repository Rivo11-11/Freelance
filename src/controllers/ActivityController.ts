import { Request, Response } from "express";
import BaseController from "./BaseController";
import { IActivity } from "../models/ActivityModel";
import ActivityService from "../services/ActivityService";
import { VerificationStatus } from "../utils/enumHelper";
import { UserRole } from "../models/UserModel";
import ResponseUtils from "../utils/responseUtils";

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

  async verifyActivity(req: Request, res: Response) {
    const { id } = req.params;
    const { verified } = req.body;
    const activity = await this.activityService.update(id, { verified });
    return ResponseUtils.success(res, activity);
  }
}
