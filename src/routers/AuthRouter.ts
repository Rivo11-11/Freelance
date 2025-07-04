// src/routes/auth.route.ts
import express from 'express';
import AuthController from '../controllers/AuthController';
import { initiateSignupValidator, signupValidator } from '../validators/AuthValidator';
import { uploadImageMiddleware } from '../middleware/uploadMiddleware';

const router = express.Router();
const authController = new AuthController();

router.post('/signup/initiate', initiateSignupValidator, authController.initiateSignup);
router.post('/signup/verify', authController.verifySignup);
router.post('/signup',signupValidator , uploadImageMiddleware('profilePicture'), authController.completeSignup);
router.post('/signin', authController.signin);

export default router;
