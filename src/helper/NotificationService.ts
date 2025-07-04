import twilio from 'twilio';
import nodemailer from 'nodemailer';

class NotificationService {
  private twilioClient: twilio.Twilio;
  private emailTransporter: nodemailer.Transporter;

  constructor() {
    // Initialize Twilio client
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    // Initialize Nodemailer transporter
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send SMS using Twilio
   */
  async sendSMS(phone: string, message: string): Promise<boolean> {
    try {
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
      return true;
    } catch (error) {
      console.error('SMS sending failed:', error);
      return false;
    }
  }

  /**
   * Send Email using Nodemailer
   */
  async sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
    try {
      await this.emailTransporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: htmlContent
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  /**
   * Send OTP via SMS
   */
  async sendOTPViaSMS(phone: string, otp: string): Promise<boolean> {
    const message = `Your Luby verification code is: ${otp}. Valid for 2 minutes.`;
    return this.sendSMS(phone, message);
  }

  /**
   * Send OTP via Email
   */
  async sendOTPViaEmail(email: string, otp: string): Promise<boolean> {
    const subject = 'Luby - Verification Code';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Luby Verification Code</h2>
        <p>Your verification code is:</p>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This code is valid for 10 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
      </div>
    `;
    return this.sendEmail(email, subject, htmlContent);
  }
}

export default new NotificationService();