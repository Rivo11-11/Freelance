import { Router } from "express";
import { ActivityController } from "../controllers/ActivityController";
import  isAuth from "../middleware/isAuth";
import { uploadMultipleMediaMiddleware } from "../middleware/uploadMiddleware";
import { createActivityValidator } from "../validators/ActivityValidator";
import { isVendor } from "../middleware/authorization";

const router = Router();
const activityController = new ActivityController();

router.get("/", activityController.getAllPaginated.bind(activityController));
router.get("/:id", activityController.getById.bind(activityController));
router.post("/",isAuth, isVendor, uploadMultipleMediaMiddleware([
    { name: 'medias', maxCount: 3 }
]), createActivityValidator, activityController.create.bind(activityController));
router.put("/:id",isAuth, isVendor, activityController.update.bind(activityController));
router.delete("/:id",isAuth, isVendor, activityController.delete.bind(activityController));

export default router; 