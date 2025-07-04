import OTPService from '../helper/OTPService';
import NotificationService from '../helper/NotificationService';
import User from '../models/UserModel';
import { SignupMethod } from '../utils/enumHelper';
import { SignupDTO } from '../DTO/signup';
import { generateToken } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/hash';

class AuthService {

    async initiateSignup(method: SignupMethod, value: string) {
            const otp = await OTPService.generateAndStoreOTP(value, method);
            switch (method) {
                case SignupMethod.EMAIL:
                    await NotificationService.sendOTPViaEmail(value, otp);
                    break;
                case SignupMethod.PHONE:
                    await NotificationService.sendOTPViaSMS(value, otp);
                    break;
            }
            return {
                message: `verification code sent to your ${method}`,
            };
    }
   
   async verifySignup(method: string, value: string, code: string) {
       // const verified = await authService.verifySignup(method, value, code);
       
   };
   
   async signup(signupDTO: SignupDTO) {
      const password = await hashPassword(signupDTO.password);
      const user = await User.create({...signupDTO, password}); 
      const token =  generateToken({ userId: user._id});
      return {
        token
      };
   };
   
   async signin(method: string, value: string, password: string) {
       const user = await User.findOne({[method]: value});
       if(!user) {
        throw new Error('user not found');
       }
       const isPasswordValid = await comparePassword(password, user.password);
       if(!isPasswordValid) {
        throw new Error('invalid password');
       }
   };
   
}

export default new AuthService();