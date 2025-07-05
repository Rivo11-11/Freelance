import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";

const router = Router();
const propertyController = new PropertyController();

// Standard CRUD routes
router.get("/", propertyController.getAll.bind(propertyController));
router.get("/:id", propertyController.getById.bind(propertyController));
router.post("/", propertyController.create.bind(propertyController));
router.put("/:id", propertyController.update.bind(propertyController));
router.delete("/:id", propertyController.delete.bind(propertyController));

// Property-specific routes
router.get("/available", propertyController.getAvailableProperties.bind(propertyController));
router.get("/type/:type", propertyController.getPropertiesByType.bind(propertyController));
router.get("/vendor/:vendorId", propertyController.getPropertiesByVendor.bind(propertyController));
router.get("/search", propertyController.searchProperties.bind(propertyController));
router.get("/price-range", propertyController.getPropertiesByPriceRange.bind(propertyController));

export default router; 