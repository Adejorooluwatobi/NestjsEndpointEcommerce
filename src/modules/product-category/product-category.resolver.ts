import { Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './services/product-category/product-category.service';
import { ProductCategory } from 'src/database/entities/productCategories.entity';


@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
    constructor(private productService: ProductCategoryService) {}

    @Query(() => [ProductCategory], {name: 'product'})
    async findProductCategory(): Promise<ProductCategory[]> {
        return this.productService.findProductCategory();
    }
}
