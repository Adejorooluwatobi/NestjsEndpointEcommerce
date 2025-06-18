import { Query, Resolver } from '@nestjs/graphql';
import { Product } from 'src/database/entities/products.entity';
import { ProductService } from '../../Services/product/product.service';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) {}

    @Query(() => [Product], {name: 'product'})
    async findProduct(): Promise<Product[]> {
        return this.productService.findProduct();
    }
}
