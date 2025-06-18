import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProductShippingDto } from '../../DTOs/ProductShippingDTO/CreateProductShipping.dto';
import { UpdateProductShippingDto } from '../../DTOs/ProductShippingDTO/UpdateProductShipping.dto';
import { StaffGuard, UniversalGuard } from 'src/security/auth/guards';
import { ProductShippingService } from '../../Services/product-shipping/product-shipping.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, ProductShippingResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(ProductShippingResponseDto)
@Controller('productShipping')
export class ProductShippingController {
    constructor(private productService: ProductShippingService) {}

    @UseGuards(StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a Product shipping' })
        @ApiCreatedResponse({
            description: 'Product shipping created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createProductShipping(@Body() createProductShippingDto: CreateProductShippingDto) {
        const prodShip = await this.productService.createProductShipping(createProductShippingDto);
        return {
            succeeded: true,
            message: 'Product shipping created successfully',
            statusCode: 201,
            resultData: prodShip,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all payment shipping' })
        @ApiOkResponse({
            description: 'Product Shipping retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ProductShippingResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getProductShipping() {
        const prodShip = await this.productService.findProductShipping();
        return {
            succeeded: true,
            message: 'Product Shipping retrieved successfully',
            statusCode: 200,
            resultData: prodShip,
        };
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get product shipping by ID' })
        @ApiOkResponse({
            description: 'Product Shipping retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Shipping not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getProductShippingById(@Param('id') id: string) {
        const prodShip = await this.productService.findProductShippingById(id);
        if (!prodShip) {
            throw new Error(`Product Shipping with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Product Shipping retrieved successfully',
            statusCode: 200,
            resultData: prodShip,
        };
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product shipping by ID' })
        @ApiOkResponse({
            description: 'Product Shipping updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Shipping not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateProductShippingById(
        @Param('id') id: string,
        @Body() updateProductShippingDto: UpdateProductShippingDto,) {
            const prodShip = await this.productService.updateProductShipping(id, updateProductShippingDto)
            if (!prodShip) {
                throw new Error(`Product Shipping with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Product Shipping updated successfully',
                statusCode: 200,
                resultData: prodShip,
            };
        }

        @UseGuards(StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
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
