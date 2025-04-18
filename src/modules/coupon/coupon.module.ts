import { Module } from '@nestjs/common';
import { CouponService } from './services/coupon/coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/database/entities';
import { CouponController } from './controllers/coupon/coupon.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_couponion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[CouponController],
  providers: [CouponService],
  exports: [CouponService]
})
export class CouponModule {}
