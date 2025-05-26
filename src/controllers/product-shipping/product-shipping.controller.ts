import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductShippingDto } from '../../DTOs/ProductShippingDTO/CreateProductShipping.dto';
import { UpdateProductShippingDto } from '../../DTOs/ProductShippingDTO/UpdateProductShipping.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductShippingService } from '../../Services/product-shipping/product-shipping.service';

@Controller('productShipping')
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
            return this.productService.findProductShippingById(id);
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductShippingById(
        @Param('id') id: string) {
            const result = await this.productService.deleteProductShipping(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Shipping deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
