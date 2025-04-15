import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { CreateProductDto } from '../../dtos/CreateProductDto';
import { UpdateProductDto } from '../../dtos/UpdateProductDto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Get()
    async getProduct() {
        return this.productService.findProduct();
    }

    @Get(':productCode')
    async getProductByCode(@Param('productCode') productCode: string) {
        return this.productService.findProductByCode(productCode);
    }

    @Put(':productCode')
    async updateProductByCode(
        @Param('productCode') productCode: string,
        @Body() updateProductDto: UpdateProductDto,) {
            await this.productService.updateProduct(productCode, updateProductDto)
        }

    @Delete(':productCode')
    async deleteProductByCode(
        @Param('productCode') productCode: string) {
            await this.productService.deleteProduct(productCode);
        }

}
