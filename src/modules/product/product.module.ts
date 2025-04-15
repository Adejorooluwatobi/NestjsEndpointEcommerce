import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entities';
import { ProductController } from './controllers/product/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers:[ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
