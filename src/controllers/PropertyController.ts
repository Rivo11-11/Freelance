import { Request, Response } from "express";
import PropertyService from "../services/PropertyService";
import BaseController from "./BaseController";
import ResponseUtils from "../utils/responseUtils";
import { IProperty } from "../models/PropertyModel";
import { UserRole } from "../models/UserModel";
import { VerificationStatus } from "../utils/enumHelper";
export class PropertyController extends BaseController<IProperty> {
  private propertyService: PropertyService;
  
  constructor() {
    const propertyService = new PropertyService();
    super(propertyService);
    this.propertyService = propertyService;
  }

  async create(req: Request, res: Response) {
     req.body.vendorId = (req as any).user;
     if ((req as any).role === UserRole.ADMIN) {
        req.body.verified = VerificationStatus.APPROVED;
     }
     return super.create(req, res);
  }

  async verifyProperty(req: Request, res: Response) {
    const { id } = req.params;
    const { verified } = req.body;
    const property = await this.propertyService.update(id, { verified });
    return ResponseUtils.success(res, property);
  }
}
