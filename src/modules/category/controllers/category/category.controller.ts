import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { CreateCategoryDto } from '../../dtos/CreateCategoryDto';
import { UpdateCategoryDto } from '../../dtos/UpdateCategoryDto';
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
            await this.categoryService.updateCategory(id, updateCategoryDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteCategoryById(
        @Param('id') id: string) {
            await this.categoryService.deleteCategory(id);
        }

}
