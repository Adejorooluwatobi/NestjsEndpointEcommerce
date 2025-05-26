import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../Services/product/product.service';
import { CreateProductDto } from '../../DTOs/ProductDTO/CreateProduct.dto';
import { UpdateProductDto } from '../../DTOs/ProductDTO/UpdateProduct.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    // @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get()
    async getProduct() {
        return this.productService.findProduct();
    }

    // @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @Get(':productCode')
    async getProductByCode(@Param('productCode') productCode: string) {
        return this.productService.findProductByCode(productCode);
    }

    @UseGuards(UserGuard, StaffGuard)
    @Put(':productCode')
    async updateProductByCode(
        @Param(':productCode') productCode: string,
        @Body() updateProductDto: UpdateProductDto,) {
            await this.productService.updateProduct(productCode, updateProductDto)
            return this.productService.findProductByCode(productCode)
        }

    @UseGuards(UserGuard, StaffGuard)
    @Delete(':productCode')
    async deleteProductByCode(
        @Param('productCode') productCode: string
    ) {
        const result = await this.productService.deleteProduct(productCode);
        if (result.affected && result.affected > 0) {
            return { success: true, message: 'Product deleted successfully.' };
        } else {
            return { success: false, message: 'Product not found.' };
        }
    }

}
