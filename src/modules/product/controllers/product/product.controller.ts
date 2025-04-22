import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { CreateProductDto } from '../../dtos/CreateProductDto';
import { UpdateProductDto } from '../../dtos/UpdateProductDto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProduct() {
        return this.productService.findProduct();
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':productCode')
    async getProductByCode(@Param('productCode') productCode: string) {
        return this.productService.findProductByCode(productCode);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':productCode')
    async updateProductByCode(
        @Param('productCode') productCode: string,
        @Body() updateProductDto: UpdateProductDto,) {
            await this.productService.updateProduct(productCode, updateProductDto)
        }

        @UseGuards(UserGuard, StaffGuard)
    @Delete(':productCode')
    async deleteProductByCode(
        @Param('productCode') productCode: string) {
            await this.productService.deleteProduct(productCode);
        }

}
