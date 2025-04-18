import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from 'src/database/entities';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductCategoryController } from './controllers/product-category/product-category.controller';
import { ProductCategoryService } from './services/product-category/product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService]
})
export class ProductCategoryModule {}
