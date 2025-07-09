// src/routes/auth.route.ts
import express from 'express';
import AuthController from '../controllers/AuthController';
import { initiateSignupValidator, signinValidator, signupValidator } from '../validators/AuthValidator';
import { uploadImageMiddleware } from '../middleware/uploadMiddleware';

const router = express.Router();
const authController = new AuthController();

router.post('/signup/initiate', initiateSignupValidator, authController.initiateSignup);
router.post('/signup/verify', authController.verifySignup);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Complete user signup
 *     description: Completes the signup process with user details and profile picture
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: User's profile picture
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         role:
 *                           type: string
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/signup',uploadImageMiddleware('profilePicture'), signupValidator, authController.completeSignup);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: User signin
 *     description: Authenticates user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Signin successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         email:
 *                           type: string
 *                         firstName:
 *                           type: string
 *                         lastName:
 *                           type: string
 *                         role:
 *                           type: string
 *                     token:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/signin', signinValidator, authController.signin);

export default router;
