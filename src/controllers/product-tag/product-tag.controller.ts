import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { CreateProductTagDto } from 'src/DTOs/ProductTagDTO/CreateProductTag.dto';
import { UpdateProductTagDto } from 'src/DTOs/ProductTagDTO/UpdateProductTag.dto';
import { ApiResponseDto, ErrorResponseDto, ProductResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ProductTagService } from 'src/Services/product-tag/product-tag.service';

@ApiExtraModels(ProductResponseDto)
@Controller('productTags')
export class ProductTagController {
    constructor(private productService: ProductTagService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
    
    @Post()
    @ApiOperation({ summary: 'Create a new product tag' })
        @ApiCreatedResponse({
            description: 'Product tag created successfully',
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
    async createProductTag(@Body() createProductTagDto: CreateProductTagDto) {
        const producttag = await this.productService.createProductTag(createProductTagDto);
        return {
            succeeded: true,
            message: 'Product Tag created successfully',
            statusCode: 201,
            resultData: producttag,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all Product tag' })
        @ApiOkResponse({
            description: 'Product tag retrieved successfully',
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
    async getProductTag() {
        const producttag = await this.productService.findProductTag();
        return {
            succeeded: true,
            message: 'Product Tags retrieved successfully',
            statusCode: 200,
            resultData: producttag,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product tag by ID' })
        @ApiOkResponse({
            description: 'Product tag retrieved successfully',
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
            description: 'Product tag not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getProductTagById(@Param('id') id: string) {
        const producttag = await this.productService.findProductTagById(id);
        if (!producttag) {
            return { error: true, message: 'Product Tag not found', statusCode: 404 };
        }
        return {
            succeeded: true,
            message: 'Product Tag retrieved successfully',
            statusCode: 200,
            resultData: producttag,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product tag by ID' })
        @ApiOkResponse({
            description: 'Product tag updated successfully',
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
            description: 'Product tag not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateProductTagById(
        @Param('id') id: string,
        @Body() updateProductTagDto: UpdateProductTagDto,) {
            const producttag =await this.productService.updateProductTag(id, updateProductTagDto);
            if (!producttag) {
                return { error: true, message: 'Product Tag not found', statusCode: 404 };
            }
            return {
                succeeded: true,
                message: 'Product Tag updated successfully',
                statusCode: 200,
                resultData: producttag,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteProductTagById(
        @Param('id') id: string) {
            const result = await this.productService.deleteProductTag(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Tag deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
