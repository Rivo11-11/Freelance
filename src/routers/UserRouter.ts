import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createUserValidation } from "../validators/UserValidator";
import { signupValidator } from "../validators/AuthValidator";

const router = Router();
const userController = new UserController();

// Standard CRUD routes
router.get("/", userController.getAllPaginated.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.post("/", signupValidator, userController.create.bind(userController));
router.put("/:id", userController.update.bind(userController));
router.delete("/:id", userController.delete.bind(userController));

// User-specific routes
router.get("/email/:email", userController.getUserByEmail.bind(userController));
router.get("/role/:role", userController.getUsersByRole.bind(userController));

export default router; 