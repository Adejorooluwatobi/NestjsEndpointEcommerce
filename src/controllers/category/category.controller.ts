import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from '../../Services/category/category.service';
import { CreateCategoryDto } from '../../DTOs/CategoryDTO/CreateCategory.dto';
import { UpdateCategoryDto } from '../../DTOs/CategoryDTO/UpdateCategory.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getCategory() {
        return this.categoryService.findCategory();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getCategoryById(@Param('id') id: string) {
        return this.categoryService.findCategoryById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateCategoryById(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,) {
            await this.categoryService.updateCategory(id, updateCategoryDto);
            return this.categoryService.findCategoryById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteCategoryById(
        @Param('id') id: string) {
            const result = await this.categoryService.deleteCategory(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Category deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
