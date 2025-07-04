// src/routes/auth.route.ts
import express from 'express';
import AuthController from '../controllers/AuthController';
import { initiateSignupValidator, signinValidator, signupValidator } from '../validators/AuthValidator';
import { uploadImageMiddleware } from '../middleware/uploadMiddleware';

const router = express.Router();
const authController = new AuthController();

router.post('/signup/initiate', initiateSignupValidator, authController.initiateSignup);
router.post('/signup/verify', authController.verifySignup);
router.post('/signup',uploadImageMiddleware('profilePicture'), signupValidator, authController.completeSignup);
router.post('/signin', signinValidator, authController.signin);

export default router;
