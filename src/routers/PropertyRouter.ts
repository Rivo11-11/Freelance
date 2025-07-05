import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import  isAuth from "../middleware/isAuth";
import { uploadMediasMiddleware, uploadPdfMiddleware } from "../middleware/uploadMiddleware";
import { createPropertyValidator } from "../validators/PropertyValidator";
const router = Router();
const propertyController = new PropertyController();

// Standard CRUD routes
router.get("/", propertyController.getAll.bind(propertyController));
router.get("/:id", propertyController.getById.bind(propertyController));
router.post("/",isAuth, uploadPdfMiddleware('ownershipContract'), uploadPdfMiddleware('facilityLicense'), uploadMediasMiddleware('medias'), createPropertyValidator, propertyController.create.bind(propertyController));
router.put("/:id",isAuth, propertyController.update.bind(propertyController));
router.delete("/:id",isAuth, propertyController.delete.bind(propertyController));

// Property-specific routes
router.get("/available", propertyController.getAvailableProperties.bind(propertyController));
router.get("/type/:type", propertyController.getPropertiesByType.bind(propertyController));
router.get("/vendor/:vendorId", propertyController.getPropertiesByVendor.bind(propertyController));
router.get("/search", propertyController.searchProperties.bind(propertyController));
router.get("/price-range", propertyController.getPropertiesByPriceRange.bind(propertyController));

export default router; 