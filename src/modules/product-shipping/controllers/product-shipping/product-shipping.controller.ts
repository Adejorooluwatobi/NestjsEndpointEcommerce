import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductShippingDto } from '../../dtos/CreateProductShippingDto';
import { UpdateProductShippingDto } from '../../dtos/UpdateProductShippingDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductShippingService } from '../../services/product-shipping/product-shipping.service';

@Controller('product')
export class ProductShippingController {
    constructor(private productService: ProductShippingService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProductShipping(@Body() createProductShippingDto: CreateProductShippingDto) {
        return this.productService.createProductShipping(createProductShippingDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProductShipping() {
        return this.productService.findProductShipping();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getProductShippingById(@Param('id') id: string) {
        return this.productService.findProductShippingById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateProductShippingById(
        @Param('id') id: string,
        @Body() updateProductShippingDto: UpdateProductShippingDto,) {
            await this.productService.updateProductShipping(id, updateProductShippingDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductShippingById(
        @Param('id') id: string) {
            await this.productService.deleteProductShipping(id);
        }

}
