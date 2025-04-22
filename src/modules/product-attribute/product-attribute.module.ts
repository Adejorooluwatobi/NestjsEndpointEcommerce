import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute, Product, ProductAttribute } from 'src/database/entities';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductAttributeController } from './controllers/product-attribute/product-attribute.controller';
import { ProductAttributeService } from './services/product-attribute/product-attribute.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute, Attribute, Product]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductAttributeController],
  providers: [ProductAttributeService],
  exports: [ProductAttributeService]
})
export class ProductAttributeModule {}
