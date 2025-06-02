import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { CreateProductAttributeDto } from '../../DTOs/ProductAttributeDTO/CreateProductAttribute.dto';
import { ProductAttributeService } from '../../Services/product-attribute/product-attribute.service';
import { UpdateProductAttributeDto } from '../../DTOs/ProductAttributeDTO/UpdateProductAttribute.dto';
import { ApiResponseDto, ErrorResponseDto, ProductAttributeResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(ProductAttributeResponseDto)
@Controller('productAttribute')
export class ProductAttributeController {
    constructor(private productAttributeService: ProductAttributeService) {}

    // @UseGuards(UserGuard, StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new product attribute' })
        @ApiCreatedResponse({
            description: 'Product Attribute created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductAttributeResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createProductAttribute(@Body() createProductAttributeDto: CreateProductAttributeDto) {
        const prodAttr = await this.productAttributeService.createProductAttribute(createProductAttributeDto);
        return {
            succeeded: true,
            message: 'Product Attribute created successfully',
            statusCode: 201,
            resultData: prodAttr,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all attributes product' })
        @ApiOkResponse({
            description: 'Product Attributes retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ProductAttributeResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getProductAttribute() {
        const prodAttr = await this.productAttributeService.findProductAttribute();
        return {
            succeeded: true,
            message: 'Product Attributes retrieved successfully',
            statusCode: 200,
            resultData: prodAttr,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get attribute product by ID' })
        @ApiOkResponse({
            description: 'Product Attribute retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductAttributeResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Attribute not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getProductAttributeById(@Param('id') id: string) {
        const prodAttr = await this.productAttributeService.findProductAttributeById(id);
        if (!prodAttr) {
            throw new Error(`Product Attribute with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Product Attribute retrieved successfully',
            statusCode: 200,
            resultData: prodAttr,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update product attribute by ID' })
        @ApiOkResponse({
            description: 'Product Attribute updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ProductAttributeResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Product Attribute not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateProductAttributeById(
        @Param('id') id: string,
        @Body() updateProductAttributeDto: UpdateProductAttributeDto,) {
            const prodAttr = await this.productAttributeService.updateProductAttribute(id, updateProductAttributeDto);
            if (!prodAttr) {
                throw new Error(`Product Attribute with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Product Attribute updated successfully',
                statusCode: 200,
                resultData: prodAttr,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteProductAttributeById(
        @Param('id') id: string) {
            const result = await this.productAttributeService.deleteProductAttribute(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Product Attriute deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
