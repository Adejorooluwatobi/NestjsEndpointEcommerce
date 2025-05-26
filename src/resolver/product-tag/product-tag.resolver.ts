import { Query, Resolver } from '@nestjs/graphql';
import { ProductTag } from 'src/database/entities/productTags.entity';
import { ProductTagService } from '../../Services/product-tag/product-tag.service';

@Resolver(() => ProductTag)
export class ProductTagResolver {
    constructor(private productService: ProductTagService) {}

    @Query(() => [ProductTag], {name: 'product'})
    async findProductTag(): Promise<ProductTag[]> {
        return this.productService.findProductTag();
    }
}
