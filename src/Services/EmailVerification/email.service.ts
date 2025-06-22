// email.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT || '2525', 10),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  async sendVerificationEmail(to: string, code: string) {
    const mailOptions = {
      from: `"No Reply" <${process.env.FROM_EMAIL}>`,
      to,
      subject: 'Your Verification Code',
      html: `<p>Your verification code is: <b>${code}</b></p>`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Mailtrap error:', error);
      throw new InternalServerErrorException('Failed to send verification email');
    }
  }

  async createAndSendVerificationCode(_email: string): Promise<string> {
    // Generate a verification code (implement your logic here)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the verification code to the user's email (implement your logic here)
    // await this.sendEmail(_email, verificationCode);

    return verificationCode;
  }
}
