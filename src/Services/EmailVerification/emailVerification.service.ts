import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { EmailService } from './email.service';
import { EmailVerification } from 'src/database/entities/email_verifications';

@Injectable()
export class EmailVerificationService {
    constructor(
        @InjectRepository(EmailVerification)
        private emailVerificationRepository: Repository<EmailVerification>,
        private emailService: EmailService,
    ) {}

    /**
     * Generates a 6-digit verification code
     */
    private generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Creates and sends a verification code to the provided email
     */
    async createAndSendVerificationCode(email: string): Promise<void> {
        try {
            // Generate verification code
            const verificationCode = this.generateVerificationCode();
            
            // Set expiration time (15 minutes from now)
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 15);

            // Invalidate any existing unused codes for this email
            await this.emailVerificationRepository.update(
                { email, isUsed: false },
                { isUsed: true }
            );

            // Create new verification record
            const verification = this.emailVerificationRepository.create({
                email,
                verificationCode,
                expiresAt,
                createdAt: new Date(),
            });

            await this.emailVerificationRepository.save(verification);

            // Send verification email
            const emailSent = await this.emailService.sendVerificationEmail(email, verificationCode);
            
            if (!emailSent) {
                throw new InternalServerErrorException('Failed to send verification email');
            }

        } catch (error) {
            console.error('Error creating verification code:', error);
            if (error instanceof InternalServerErrorException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to create and send verification code');
        }
    }

    /**
     * Verifies the provided code for the given email
     */
    async verifyCode(email: string, code: string): Promise<boolean> {
        try {
            // Find valid, unused verification code
            const verification = await this.emailVerificationRepository.findOne({
                where: {
                    email,
                    verificationCode: code,
                    isUsed: false,
                    expiresAt: LessThan(new Date()), // Not expired
                },
            });

            if (!verification) {
                throw new BadRequestException('Invalid or expired verification code');
            }

            // Mark code as used
            verification.isUsed = true;
            await this.emailVerificationRepository.save(verification);

            return true;
        } catch (error) {
            console.error('Error verifying code:', error);
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to verify code');
        }
    }

    /**
     * Verifies the email using the provided token
     */
    async verifyEmail(_token: string): Promise<boolean> {
        // TODO: Implement email verification logic here
        return true;
    }

    /**
     * Resends verification code with rate limiting
     */
    async resendVerificationCode(email: string): Promise<void> {
        try {
            // Check for recent resend attempts (rate limiting)
            const recentVerification = await this.emailVerificationRepository.findOne({
                where: { email },
                order: { createdAt: 'DESC' },
            });

            if (recentVerification) {
                const now = new Date();
                const timeSinceLastResend = recentVerification.lastResendAt 
                    ? now.getTime() - recentVerification.lastResendAt.getTime()
                    : now.getTime() - recentVerification.createdAt.getTime();

                // Rate limit: Allow resend only after 1 minute
                if (timeSinceLastResend < 60000) { // 60 seconds
                    const waitTime = Math.ceil((60000 - timeSinceLastResend) / 1000);
                    throw new BadRequestException(`Please wait ${waitTime} seconds before requesting another code`);
                }

                // Check resend limit (max 5 resends per hour)
                if (recentVerification.resendCount >= 5) {
                    const hoursSinceFirst = (now.getTime() - recentVerification.createdAt.getTime()) / (1000 * 60 * 60);
                    if (hoursSinceFirst < 1) {
                        throw new BadRequestException('Maximum resend attempts reached. Please try again later.');
                    }
                }
            }

            // Generate new verification code
            const verificationCode = this.generateVerificationCode();
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 15);

            // Invalidate existing codes
            await this.emailVerificationRepository.update(
                { email, isUsed: false },
                { isUsed: true }
            );

            // Create new verification record
            const verification = this.emailVerificationRepository.create({
                email,
                verificationCode,
                expiresAt,
                resendCount: recentVerification ? recentVerification.resendCount + 1 : 1,
                lastResendAt: new Date(),
            });

            await this.emailVerificationRepository.save(verification);

            // Send verification email
            const emailSent = await this.emailService.sendVerificationEmail(email, verificationCode);
            
            if (!emailSent) {
                throw new InternalServerErrorException('Failed to send verification email');
            }

        } catch (error) {
            console.error('Error resending verification code:', error);
            if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to resend verification code');
        }
    }

    /**
     * Cleanup expired verification codes (call this periodically)
     */
    async cleanupExpiredCodes(): Promise<void> {
        try {
            const now = new Date();
            await this.emailVerificationRepository.delete({
                expiresAt: LessThan(now),
            });
        } catch (error) {
            console.error('Error cleaning up expired codes:', error);
        }
    }

    /**
     * Sends a verification email (stub implementation)
     */
    async sendVerificationEmail(_email: string): Promise<boolean> {
        // Implement the logic to send a verification email here
        // For now, return true as a placeholder
        return true;
    }
}