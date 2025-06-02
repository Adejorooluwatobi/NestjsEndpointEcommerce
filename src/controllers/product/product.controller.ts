import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from '../../Services/product/product.service';
import { CreateProductDto } from '../../DTOs/ProductDTO/CreateProduct.dto';
import { UpdateProductDto } from '../../DTOs/ProductDTO/UpdateProduct.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiResponseDto, ErrorResponseDto, ProductResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(ProductResponseDto)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiOperation({ summary: 'Create a new product' })
        @ApiCreatedResponse({
            description: 'Product created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto) {
        const product = await this.productService.createProduct(createProductDto);
        return {
            succeeded: true,
            message: 'Product created successfully',
            statusCode: 201,
            resultData: product,
        };
    }

    // @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all product' })
        @ApiOkResponse({
            description: 'Product retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ProductResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getProduct() {
        const product = await this.productService.findProduct();
        return {
            succeeded: true,
            message: 'Product retrieved successfully',
            statusCode: 200,
            resultData: product,
        };
    }

    // @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product by code' })
        @ApiOkResponse({
            description: 'Product retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product not found',
            type: ErrorResponseDto
        })
    @Get(':productCode')
    async getProductByCode(@Param('productCode') productCode: string) {
        const product = await this.productService.findProductByCode(productCode);
        if (!product) {
            throw new Error(`Product with code ${productCode} not found`);
        }
        return {
            succeeded: true,
            message: 'Product retrieved successfully',
            statusCode: 200,
            resultData: product,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product by code' })
        @ApiOkResponse({
            description: 'Product updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':productCode')
    async updateProductByCode(
        @Param(':productCode') productCode: string,
        @Body() updateProductDto: UpdateProductDto,) {
            const product = await this.productService.updateProduct(productCode, updateProductDto)
            if (!product) {
                throw new Error(`Product with code ${productCode} not found`);
            }
            return {
                succeeded: true,
                message: 'Product updated successfully',
                statusCode: 200,
                resultData: product,
            };
        }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
    @Delete(':productCode')
    @ApiOperation({ summary: 'Delete by ID' })
            @ApiNoContentResponse({ description: 'deleted successfully' })
            @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
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
