import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CreateProductAttributeDto } from '../../DTOs/ProductAttributeDTO/CreateProductAttribute.dto';
import { ProductAttributeService } from '../../Services/product-attribute/product-attribute.service';
import { UpdateProductAttributeDto } from '../../DTOs/ProductAttributeDTO/UpdateProductAttribute.dto';

@Controller('productAttribute')
export class ProductAttributeController {
    constructor(private productAttributeService: ProductAttributeService) {}

    // @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProductAttribute(@Body() createProductAttributeDto: CreateProductAttributeDto) {
        return this.productAttributeService.createProductAttribute(createProductAttributeDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProductAttribute() {
        return this.productAttributeService.findProductAttribute();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getProductAttributeById(@Param('id') id: string) {
        return this.productAttributeService.findProductAttributeById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateProductAttributeById(
        @Param('id') id: string,
        @Body() updateProductAttributeDto: UpdateProductAttributeDto,) {
            await this.productAttributeService.updateProductAttribute(id, updateProductAttributeDto);
            return this.productAttributeService.findProductAttributeById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductAttributeById(
        @Param('id') id: string) {
            const result = await this.productAttributeService.deleteProductAttribute(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Attriute deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
