import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from 'src/database/entities/email_verifications';
import { EmailService } from 'src/Services/EmailVerification/email.service';
import { EmailVerificationService } from 'src/Services/EmailVerification/emailVerification.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification])],
  providers: [EmailVerificationService, EmailService],
  exports: [EmailVerificationService, EmailService],
})
export class EmailVerificationModule {}