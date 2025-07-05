import { Request, Response } from "express";
import PropertyService from "../services/PropertyService";
import BaseController from "./BaseController";
import ResponseUtils from "../utils/responseUtils";
import { IProperty } from "../models/PropertyModel";

export class PropertyController extends BaseController<IProperty> {
  private propertyService: PropertyService;
  
  constructor() {
    const propertyService = new PropertyService();
    super(propertyService);
    this.propertyService = propertyService;
  }

  async getAvailableProperties(req: Request, res: Response) {
      const properties = await this.propertyService.getAvailableProperties();
      return ResponseUtils.success(res, properties);
  }

  async getPropertiesByType(req: Request, res: Response) {
      const { type } = req.params;
      const properties = await this.propertyService.getPropertiesByType(type);
      return ResponseUtils.success(res, properties);
  }

  async getPropertiesByVendor(req: Request, res: Response) {
      const { vendorId } = req.params;
      const properties = await this.propertyService.getPropertiesByVendor(vendorId);
      return ResponseUtils.success(res, properties);
  }

  async getPropertiesByPriceRange(req: Request, res: Response) {
      const { minPrice, maxPrice } = req.query;
      const properties = await this.propertyService.getPropertiesByPriceRange(
        Number(minPrice), 
        Number(maxPrice)
      );
      return ResponseUtils.success(res, properties);
  }

  async searchProperties(req: Request, res: Response) {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return ResponseUtils.badRequest(res, 'Search query is required');
      }
      
      const properties = await this.propertyService.searchProperties(q);
      return ResponseUtils.success(res, properties);
  }
}
