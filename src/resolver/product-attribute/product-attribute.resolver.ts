import { Query, Resolver } from '@nestjs/graphql';
import { ProductAttribute } from 'src/database/entities/productAttributes.entity';
import { ProductAttributeService } from '../../Services/product-attribute/product-attribute.service';


@Resolver(() => ProductAttribute)
export class ProductAttributeResolver {
    constructor(private productService: ProductAttributeService) {}

    @Query(() => [ProductAttribute], {name: 'product'})
    async findProductAttribute(): Promise<ProductAttribute[]> {
        return this.productService.findProductAttribute();
    }
}
