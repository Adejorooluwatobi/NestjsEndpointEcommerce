import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CreateProductCategoryDto } from '../../dtos/CreateProductCategoryDto';
import { UpdateProductCategoryDto } from '../../dtos/UpdateProductCategoryDto';
import { ProductCategoryService } from '../../services/product-category/product-category.service';

@Controller('product')
export class ProductCategoryController {
    constructor(private productService: ProductCategoryService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProductCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productService.createProductCategory(createProductCategoryDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProductCategory() {
        return this.productService.findProductCategory();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getProductCategoryById(@Param('id') id: string) {
        return this.productService.findProductCategoryById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateProductCategoryById(
        @Param('id') id: string,
        @Body() updateProductCategoryDto: UpdateProductCategoryDto,) {
            await this.productService.updateProductCategory(id, updateProductCategoryDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductCategoryById(
        @Param('id') id: string) {
            await this.productService.deleteProductCategory(id);
        }

}
