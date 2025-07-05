import { Request, Response } from 'express';
import BaseService from '../services/BaseService';
import ResponseUtils from '../utils/responseUtils';
import { Document } from 'mongoose';

export default abstract class BaseController<T extends Document> {
  protected service: BaseService<T>;

  constructor(service: BaseService<T>) {
    this.service = service;
  }

  // Default CRUD operations
  async getAll(req: Request, res: Response) {
      const entities = await this.service.getAll();
      return ResponseUtils.success(res, entities);
  }

  async getById(req: Request, res: Response) {
      const { id } = req.params;
      const entity = await this.service.getById(id);
      
      if (!entity) {
        return ResponseUtils.notFound(res, 'Entity not found');
      }
      
      return ResponseUtils.success(res, entity);
  }

  async create(req: Request, res: Response) {
      const entity = await this.service.create(req.body);
      return ResponseUtils.success(res, entity);
  }

  async update(req: Request, res: Response) {
      const { id } = req.params;
      const entity = await this.service.update(id, req.body);
      
      if (!entity) {
        return ResponseUtils.notFound(res, 'Entity not found');
      }
      
      return ResponseUtils.success(res, entity);
  }

  async delete(req: Request, res: Response) {
      const { id } = req.params;
      const entity = await this.service.delete(id);
      
      if (!entity) {
        return ResponseUtils.notFound(res, 'Entity not found');
      }
      
      return ResponseUtils.success(res, { message: 'Entity deleted successfully' });
  }
} 