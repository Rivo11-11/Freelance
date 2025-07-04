import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";
import { SignupMethod } from "../utils/enumHelper";
import User from "../models/UserModel";
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
    validateRequest
];
