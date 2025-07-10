import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createUserValidation } from "../validators/UserValidator";
import { signupValidator } from "../validators/AuthValidator";
import isAuth from "../middleware/isAuth";
import { isAdmin } from "../middleware/authorization";

const router = Router();
const userController = new UserController();

router.get("/", userController.getAllPaginated.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.post("/", isAuth, isAdmin, signupValidator, userController.create.bind(userController));
router.put("/:id", isAuth, isAdmin, userController.update.bind(userController));
router.delete("/:id", isAuth, isAdmin, userController.delete.bind(userController));
router.get("/email/:email", userController.getUserByEmail.bind(userController));
router.get("/role/:role", userController.getUsersByRole.bind(userController));

export default router; 