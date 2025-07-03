import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createUserValidation } from "../validators/UserValidator";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAll.bind(userController));
router.post("/", createUserValidation, userController.create.bind(userController));

export default router; 