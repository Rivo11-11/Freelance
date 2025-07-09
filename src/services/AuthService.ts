import OTPService from '../helper/OTPService';
import NotificationService from '../helper/NotificationService';
import User from '../models/UserModel';
import { SignupMethod } from '../utils/enumHelper';
import { SignupDTO } from '../DTO/signup';
import { generateToken } from '../utils/jwt';
import { comparePassword, hashPassword } from '../utils/hash';
import { SigninDTO } from '../DTO/signin';
import CustomError from '../utils/errorUtils';

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
      const { token, expiresIn } =  generateToken({ userId: user._id, role: user.role});
      return {
        token,
        expiresIn,
        user
      };
   };
   
   async signin(signinDTO: SigninDTO) {
       const user = await User.findOne({email: signinDTO.email});
       if(!user) {
        throw new CustomError('email or password is incorrect', 442);
       }
       const isPasswordValid = await comparePassword(signinDTO.password, user.password);
       if(!isPasswordValid) {
        throw new CustomError('email or password is incorrect', 442);
       }
       const { token, expiresIn } =  generateToken({ userId: user._id, role: user.role});
       return {
        token,
        expiresIn,
        user
       }
   };
   
}

export default new AuthService();