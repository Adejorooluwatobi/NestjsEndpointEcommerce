import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon, Product, ProductCoupon } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductCouponController } from './controllers/product-coupon/product-coupon.controller';
import { ProductCouponService } from './services/product-coupon/product-coupon.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCoupon, Coupon, Product]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductCouponController],
  providers: [ProductCouponService],
  exports: [ProductCouponService]
})
export class ProductCouponModule {}
