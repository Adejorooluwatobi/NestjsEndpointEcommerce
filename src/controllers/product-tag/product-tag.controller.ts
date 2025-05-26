import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductTagDto } from 'src/DTOs/ProductTagDTO/CreateProductTag.dto';
import { UpdateProductTagDto } from 'src/DTOs/ProductTagDTO/UpdateProductTag.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductTagService } from 'src/Services/product-tag/product-tag.service';

@Controller('productTags')
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
            await this.productService.updateProductTag(id, updateProductTagDto);
            return this.productService.findProductTagById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductTagById(
        @Param('id') id: string) {
            const result = await this.productService.deleteProductTag(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Tag deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
