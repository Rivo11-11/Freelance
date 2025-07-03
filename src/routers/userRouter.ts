import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUsers.bind(userController));
router.post('/', userController.createUser.bind(userController));

export default router; 