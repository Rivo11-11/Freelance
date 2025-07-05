import { Router } from 'express';
import BaseController from '../controllers/BaseController';
import { Document } from 'mongoose';

export class RouterFactory {
  static createCRUDRoutes<T extends Document>(
    controller: BaseController<T>,
    basePath: string,
    additionalRoutes: Array<{
      method: 'get' | 'post' | 'put' | 'delete' | 'patch';
      path: string;
      handler: string;
    }> = []
  ): Router {
    const router = Router();

    // Standard CRUD routes
    router.get(`/${basePath}`, controller.getAll.bind(controller));
    router.get(`/${basePath}/:id`, controller.getById.bind(controller));
    router.post(`/${basePath}`, controller.create.bind(controller));
    router.put(`/${basePath}/:id`, controller.update.bind(controller));
    router.delete(`/${basePath}/:id`, controller.delete.bind(controller));

    // Additional custom routes
    additionalRoutes.forEach(route => {
      const handler = (controller as any)[route.handler];
      if (handler) {
        router[route.method](`/${basePath}${route.path}`, handler.bind(controller));
      }
    });

    return router;
  }
} 