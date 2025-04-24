import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './controllers/payment/payment.controller';
import { PaymentService } from './services/payment/payment.service';
import { Payment } from 'src/database/entities/payment.entity';
import { Customer } from 'src/database/entities/customers.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forFeature([Payment, Customer]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}