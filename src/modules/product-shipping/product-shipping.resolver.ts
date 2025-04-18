import { Query, Resolver } from '@nestjs/graphql';
import { ProductShippingService } from './services/product-shipping/product-shipping.service';
import { ProductShipping } from 'src/database/entities/productShippings.entity';

@Resolver(() => ProductShipping)
export class ProductShippingResolver {
    constructor(private productService: ProductShippingService) {}

    @Query(() => [ProductShipping], {name: 'product'})
    async findProductShipping(): Promise<ProductShipping[]> {
        return this.productService.findProductShipping();
    }
}
