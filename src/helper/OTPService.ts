import otpGenerator from 'otp-generator';
import { VerificationModel } from '../models/VerificationModel';
import { SignupMethod } from '../utils/enumHelper';
class OTPService {
  constructor() {}

 
  async generateAndStoreOTP(value: string, method: SignupMethod): Promise<string> {
    const otp = otpGenerator.generate(6, { digits: true });
    await VerificationModel.create({
      method,
      value,
      code: otp,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000) // document will remove after 2 minutes
    });
    return otp;
  }

  async verifyOTP(value: string, method: SignupMethod, otp: string): Promise<boolean> {
    const storedOTP = await VerificationModel.findOne({ value, method });

    if (!storedOTP) {
      return false; 
    }

    if (storedOTP.code === otp) {
      return true;
    }

    return false;
  }
}

export default new OTPService();