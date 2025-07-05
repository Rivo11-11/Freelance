import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { createUserValidation } from "../validators/UserValidator";
import { RouterFactory } from "../utils/routerFactory";

const router = Router();
const userController = new UserController();

// Use RouterFactory to create CRUD routes
const crudRouter = RouterFactory.createCRUDRoutes(
  userController,
  'users',
  [
    { method: 'get', path: '/email/:email', handler: 'getUserByEmail' },
    { method: 'get', path: '/role/:role', handler: 'getUsersByRole' }
  ]
);

// Apply validation middleware to specific routes
crudRouter.post('/users', createUserValidation, userController.create.bind(userController));

router.use(crudRouter);

export default router; 