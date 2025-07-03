import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

export const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validateRequest
  ];