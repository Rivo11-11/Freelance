import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import { RouterFactory } from "../utils/routerFactory";

const router = Router();
const propertyController = new PropertyController();

const crudRouter = RouterFactory.createCRUDRoutes(
  propertyController,
  'properties',
  [
    { method: 'get', path: '/available', handler: 'getAvailableProperties' },
    { method: 'get', path: '/type/:type', handler: 'getPropertiesByType' },
    { method: 'get', path: '/vendor/:vendorId', handler: 'getPropertiesByVendor' },
    { method: 'get', path: '/search', handler: 'searchProperties' },
    { method: 'get', path: '/price-range', handler: 'getPropertiesByPriceRange' }
  ]
);

router.use(crudRouter);

export default router; 