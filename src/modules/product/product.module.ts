import { Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';

@Module({
  providers: [ProductService]
})
export class ProductModule {}
