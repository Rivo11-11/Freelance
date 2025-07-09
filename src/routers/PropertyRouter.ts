import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import  isAuth from "../middleware/isAuth";
import { uploadMultipleMediaMiddleware } from "../middleware/uploadMiddleware";
import { createPropertyValidator } from "../validators/PropertyValidator";
import { isVendor } from "../middleware/authorization";
const router = Router();
const propertyController = new PropertyController();

// Standard CRUD routes
router.get("/", propertyController.getAllPaginated.bind(propertyController));
router.get("/:id", propertyController.getById.bind(propertyController));
router.post("/",isAuth, isVendor, uploadMultipleMediaMiddleware([
    { name: 'ownershipContract' },
    { name: 'facilityLicense' },
    { name: 'medias', maxCount: 3 }
]), createPropertyValidator, propertyController.create.bind(propertyController));
router.put("/:id",isAuth, isVendor, propertyController.update.bind(propertyController));
router.delete("/:id",isAuth, isVendor, propertyController.delete.bind(propertyController));

// Property-specific routes
router.get("/available", propertyController.getAvailableProperties.bind(propertyController));
router.get("/type/:type", propertyController.getPropertiesByType.bind(propertyController));
router.get("/vendor/:vendorId", propertyController.getPropertiesByVendor.bind(propertyController));
router.get("/search", propertyController.searchProperties.bind(propertyController));
router.get("/price-range", propertyController.getPropertiesByPriceRange.bind(propertyController));

export default router; 