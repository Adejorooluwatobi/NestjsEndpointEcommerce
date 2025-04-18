import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductTagDto } from '../../dtos/CreateProductTagDto';
import { UpdateProductTagDto } from '../../dtos/UpdateProductTagDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductTagService } from '../../services/product-tag/product-tag.service';

@Controller('product')
export class ProductTagController {
    constructor(private productService: ProductTagService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProductTag(@Body() createProductTagDto: CreateProductTagDto) {
        return this.productService.createProductTag(createProductTagDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProductTag() {
        return this.productService.findProductTag();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getProductTagById(@Param('id') id: string) {
        return this.productService.findProductTagById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateProductTagById(
        @Param('id') id: string,
        @Body() updateProductTagDto: UpdateProductTagDto,) {
            await this.productService.updateProductTag(id, updateProductTagDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductTagById(
        @Param('id') id: string) {
            await this.productService.deleteProductTag(id);
        }

}
