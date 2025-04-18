import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CreateProductAttributeDto } from '../../dtos/CreateProductAttributeDto';
import { ProductAttributeService } from '../../services/product-attribute/product-attribute.service';
import { UpdateProductAttributeDto } from '../../dtos/UpdateProductAttributeDto';

@Controller('productAttribute')
export class ProductAttributeController {
    constructor(private productAttributeService: ProductAttributeService) {}

    @UseGuards(UserGuard, StaffGuard)
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
            await this.productAttributeService.updateProductAttribute(id, updateProductAttributeDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductAttributeById(
        @Param('id') id: string) {
            await this.productAttributeService.deleteProductAttribute(id);
        }

}
