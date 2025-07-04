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
