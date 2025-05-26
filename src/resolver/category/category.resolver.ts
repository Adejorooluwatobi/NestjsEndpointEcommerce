import { Query, Resolver } from '@nestjs/graphql';
import { Category } from 'src/database/entities/categories.entity';
import { CategoryService } from '../../Services/category/category.service';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private categoryService: CategoryService) {}

    @Query(() => [Category], {name: 'category'})
    async findCategory(): Promise<Category[]> {
        return this.categoryService.findCategory();
    }
}
