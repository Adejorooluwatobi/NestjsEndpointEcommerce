import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductTag, Tag } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ProductTagService } from '../../Services/product-tag/product-tag.service';
import { ProductTagController } from 'src/controllers/product-tag/product-tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTag, Product, Tag]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[ProductTagController],
  providers: [ProductTagService],
  exports: [ProductTagService]
})
export class ProductTagModule {}
