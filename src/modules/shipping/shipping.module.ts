import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ShippingController } from './controllers/shipping/shipping.controller';
import { ShippingService } from './services/product-shipping/shipping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_shippingion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ShippingController],
  providers: [ShippingService],
  exports: [ShippingService]
})
export class ShippingModule {}
