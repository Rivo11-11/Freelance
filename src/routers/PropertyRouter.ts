import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import  isAuth from "../middleware/isAuth";
import { uploadMultipleMediaMiddleware } from "../middleware/uploadMiddleware";
import { createPropertyValidator } from "../validators/PropertyValidator";
import { isAdmin, isVendor } from "../middleware/authorization";

const router = Router();
const propertyController = new PropertyController();

router.get("/", propertyController.getAllPaginated.bind(propertyController));
router.get("/:id", propertyController.getById.bind(propertyController));
router.post("/",isAuth, isVendor, uploadMultipleMediaMiddleware([
    { name: 'ownershipContract' },
    { name: 'facilityLicense' },
    { name: 'medias', maxCount: 3 }
]), createPropertyValidator, propertyController.create.bind(propertyController));
router.put("/:id",isAuth, isVendor, propertyController.update.bind(propertyController));
router.delete("/:id",isAuth, isVendor, propertyController.delete.bind(propertyController));

// custom routes
router.get("/:id/verify", isAuth, isAdmin, propertyController.verifyProperty.bind(propertyController));

export default router; 