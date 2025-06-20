import { Injectable, Logger } from '@nestjs/common';
// Note: You'll need to install nodemailer
// npm install nodemailer @types/nodemailer

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendVerificationEmail(email: string, verificationCode: string): Promise<boolean> {
        try {
            // For demonstration, I'm logging the email. 
            // In production, you should use a proper email service like:
            // - SendGrid
            // - AWS SES
            // - Nodemailer with SMTP
            
            this.logger.log(`Sending verification email to: ${email}`);
            this.logger.log(`Verification code: ${verificationCode}`);
            
            // Example email template
            const _emailTemplate = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Welcome!</h2>
                    <p>Thank you for registering with us. Please use the verification code below to activate your account:</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                        <h1 style="color: #007bff; margin: 0; font-size: 32px; letter-spacing: 8px;">${verificationCode}</h1>
                    </div>
                    
                    <p style="color: #666;">This code will expire in 15 minutes.</p>
                    <p style="color: #666;">If you didn't create an account with us, please ignore this email.</p>
                    
                    <hr style="margin: 30px 0;">
                    <p style="color: #999; font-size: 12px;">© 2025 Buddy Store. All rights reserved.</p>
                </div>
            `;

            // TODO: Implement actual email sending logic here
            // For now, we'll simulate successful sending
            // await this.sendEmail(email, 'Verify Your Account - Buddy Store', emailTemplate);
            
            return true;
        } catch (error) {
            this.logger.error(`Failed to send verification email to ${email}:`, error);
            return false;
        }
    }

    // Uncomment and implement this method when you set up your email provider
    /*
    private async sendEmail(to: string, subject: string, html: string): Promise<void> {
        // Example with nodemailer
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html,
        });
    }
    */
}