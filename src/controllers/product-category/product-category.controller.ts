import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CreateProductCategoryDto } from '../../DTOs/ProductCategoryDTO/CreateProductCategory.dto';
import { UpdateProductCategoryDto } from '../../DTOs/ProductCategoryDTO/UpdateProductCategory.dto';
import { ProductCategoryService } from '../../Services/product-category/product-category.service';
import { ApiResponseDto, ErrorResponseDto, ProductCategoryResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(ProductCategoryResponseDto)
@Controller('productCategory')
export class ProductCategoryController {
    constructor(private productService: ProductCategoryService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new product category' })
        @ApiCreatedResponse({
            description: 'Product Category created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createProductCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        const prodCate = await this.productService.createProductCategory(createProductCategoryDto);
        return {
            succeeded: true,
            message: 'Product Category created successfully',
            statusCode: 201,
            resultData: prodCate,
        };
    }
    
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all product category' })
        @ApiOkResponse({
            description: 'Product Category retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ProductCategoryResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getProductCategory() {
        const prodCate = this.productService.findProductCategory();
        return {
            succeeded: true,
            message: 'Product Categories retrieved successfully',
            statusCode: 200,
            resultData: prodCate,
        };
    }

     @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product category by ID' })
        @ApiOkResponse({
            description: 'Product Category retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Category not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getProductCategoryById(@Param('id') id: string) {
        const prodCate = await this.productService.findProductCategoryById(id);
        if (!prodCate) {
            throw new Error('Product Category not found');
        }
        return {
            succeeded: true,
            message: 'Product Category retrieved successfully',
            statusCode: 200,
            resultData: prodCate,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product category by ID' })
        @ApiOkResponse({
            description: 'Product Category updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductCategoryResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Category not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateProductCategoryById(
        @Param('id') id: string,
        @Body() updateProductCategoryDto: UpdateProductCategoryDto,) {
            const prodCate = await this.productService.updateProductCategory(id, updateProductCategoryDto)
            if (!prodCate) {
                throw new Error('Product Category not found');
            }
            return {
                succeeded: true,
                message: 'Product Category updated successfully',
                statusCode: 200,
                resultData: prodCate,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteProductCategoryById(
        @Param('id') id: string) {
            const result = await this.productService.deleteProductCategory(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Category deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
