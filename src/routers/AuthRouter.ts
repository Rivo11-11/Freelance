// src/routes/auth.route.ts
import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();
const authController = new AuthController();

router.post('/signup/initiate', authController.initiateSignup);
router.post('/signup/verify', authController.verifySignup);
router.post('/signup/complete', authController.completeSignup);
router.post('/signin', authController.signin);

export default router;
