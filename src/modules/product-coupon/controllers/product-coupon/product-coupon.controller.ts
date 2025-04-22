import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductCouponService } from '../../services/product-coupon/product-coupon.service';
import { UpdateProductCouponDto } from '../../dtos/UpdateProductCouponDto';
import { CreateProductCouponDto } from '../../dtos/CreateProductCouponDto';

@Controller('product')
export class ProductCouponController {
    constructor(private productService: ProductCouponService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProductCoupon(@Body() createProductCouponDto: CreateProductCouponDto) {
        return this.productService.createProductCoupon(createProductCouponDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProductCoupon() {
        return this.productService.findProductCoupon();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':id')
    async getProductCouponById(@Param('id') id: string) {
        return this.productService.findProductCouponById(id);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':id')
    async updateProductCouponById(
        @Param('id') id: string,
        @Body() updateProductCouponDto: UpdateProductCouponDto,) {
            await this.productService.updateProductCoupon(id, updateProductCouponDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':id')
    async deleteProductCouponById(
        @Param('id') id: string) {
            await this.productService.deleteProductCoupon(id);
        }

}
