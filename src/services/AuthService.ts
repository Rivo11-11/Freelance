import OTPService from '../helper/OTPService';
import NotificationService from '../helper/NotificationService';
import User from '../models/UserModel';
import { SignupMethod } from '../utils/enumHelper';

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
   
   async completeSignup(name: string, email: string, phone: string, password: string, profileImage: string) {
       // const token = await authService.completeSignup({ name, email, phone, password, profileImage });
       
   };
   
   async signin(method: string, value: string, password: string) {
       // const token = await authService.signin(method, value, password);
       
   };
   
}

export default new AuthService();