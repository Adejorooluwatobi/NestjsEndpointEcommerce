import { Module } from '@nestjs/common';
import { CategoryService } from './services/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, ProductCategory } from 'src/database/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from './controllers/category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, ProductCategory]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_categoryion',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers:[CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
