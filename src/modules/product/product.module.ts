import { Module } from '@nestjs/common';
import { ProductService } from '../../Services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery, Product, ProductAttribute, ProductCategory, ProductCoupon, ProductShipping, ProductTag, Variant } from 'src/database/entities';
import { ProductController } from '../../controllers/product/product.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Gallery, Variant, ProductAttribute, ProductCategory, ProductCoupon, ProductShipping, ProductTag]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
