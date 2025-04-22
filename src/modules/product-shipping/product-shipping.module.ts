import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductShipping, Shipping } from 'src/database/entities';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductShippingController } from './controllers/product-shipping/product-shipping.controller';
import { ProductShippingService } from './services/product-shipping/product-shipping.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductShipping, Product, Shipping]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductShippingController],
  providers: [ProductShippingService],
  exports: [ProductShippingService]
})
export class ProductShippingModule {}
