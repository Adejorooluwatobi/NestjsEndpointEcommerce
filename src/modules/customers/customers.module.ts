import { Module } from '@nestjs/common';
import { CustomersController } from '../../controllers/customers/customers.controller';
import { CustomersService } from '../../Services/customers/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/Profile.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from 'src/database/entities/customers.entity';
import { EmailVerification } from 'src/database/entities/email_verifications';
import { CustomersResolver } from 'src/resolver/customers/customers.resolver';
import { CustomerVerificationController } from 'src/controllers/EmailVerification/emailVerification.controller';
import { EmailVerificationService } from 'src/Services/EmailVerification/emailVerification.service';
import { EmailService } from 'src/Services/EmailVerification/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([Customer, Profile, EmailVerification]), // Register the Customer, Profile, and EmailVerification entities
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),], // Import TypeOrmModule and register the Customer entity
  controllers: [CustomersController, CustomerVerificationController],
  providers: [CustomersService, CustomersResolver, EmailVerificationService, EmailService,],
  exports: [CustomersService, EmailVerificationService] // Export CustomersService if needed in other modules
})
export class CustomersModule {}
