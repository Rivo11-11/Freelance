import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { SignupMethod } from "../utils/enumHelper";
import User, { UserRole } from "../models/UserModel";

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

export const initiateSignupValidator = [
    body('method').notEmpty().withMessage('method is required')
    .isIn(Object.values(SignupMethod)).withMessage('invalid method'),

    body('value')
    .notEmpty().withMessage('value is required')
    .custom(async (value, { req }) => {
      const method = req.body.method;
      const filter = method === SignupMethod.EMAIL ? { email: value } : { phone: value };
      const existingUser = await User.findOne(filter);
      if (existingUser) {
        throw new Error(`${method} already registered`);
      }

      return true;
    }),
    validateRequest
];

export const signupValidator = [
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email')
    .custom(async (value, { req }) => {
      const email = req.body.email;
      const filter = { email };
      const existingUser = await User.findOne(filter);
      if (existingUser) {
        throw new Error(`email already registered`);
      }
      return true;
    }),
    body('phone').notEmpty().withMessage('phone is required')
    .custom(async (value, { req }) => {
      const phone = req.body.phone;
      const filter = { phone };
      const existingUser = await User.findOne(filter);
      if (existingUser) {
        throw new Error(`phone already registered`);
      }
      return true;
    }),
    body('role').notEmpty().withMessage('role is required')
    .isIn(Object.values(UserRole)).withMessage('invalid role'),
    body('password').notEmpty().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
    body('profilePicture')
    .custom((value, { req }) => {
      const file = req.file;  
      if (!file) return true;

      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        throw new Error('Only JPG, JPEG, and PNG images are allowed');
      }
      
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('Image size must be less than 10MB');
      }
      
      return true;
    }),
    validateRequest
];

export const signinValidator = [
    body('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('password is required')
    .isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
];