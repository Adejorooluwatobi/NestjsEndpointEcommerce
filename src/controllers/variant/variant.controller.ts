import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { VariantService } from '../../Services/variant/variant.service';
import { CreateVariantDto } from '../../DTOs/VariantDTO/CreateVariant.dto';
import { UpdateVariantDto } from '../../DTOs/VariantDTO/UpdateVariant.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, VariantResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(VariantResponseDto)
@Controller('variant')
export class VariantController {
    constructor(private readonly variantService: VariantService) {}

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new variant' })
        @ApiOkResponse({
            description: 'Variant created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantResponseDto) }
                        }
                    }
                ]
            }
        })
    async createVariant(@Body() createVariantDto: CreateVariantDto) {
        const variant = await this.variantService.createVariant(createVariantDto)
        return {
            succeeded: true,
            message: 'Variant created successfully',
            statusCode: 201,
            resultData: variant,
        };
    }

    @Get()
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all attributes' })
        @ApiOkResponse({
            description: 'Attributes retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(VariantResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    async getVariant() {
        const variant = await this.variantService.findVariant();
        return {
            succeeded: true,
            message: 'Variant retrieved successfully',
            statusCode: 200,
            resultData: variant,
        };
    }

    @Get(':id')
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get variant by ID' })
        @ApiOkResponse({
            description: 'Variant retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Variant not found',
            type: ErrorResponseDto
        })
    async getVariantById(@Param('id', ParseUUIDPipe) id: string) {
        const variant = await this.variantService.findVariantById(id);
        if (!variant) {
            throw new Error(`Variant with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Variant retrieved successfully',
            statusCode: 200,
            resultData: variant,
        };
    }

    @Put(':id')
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update variant by ID' })
        @ApiOkResponse({
            description: 'Variant updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Variant not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    async updateVariantById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateVariantDto: UpdateVariantDto,) {
            const variant = await this.variantService.updateVariant(id, UpdateVariantDto);
            if (!variant) {
                throw new Error(`Variant with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Variant updated successfully',
                statusCode: 200,
                resultData: variant,
            };
        }
    
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteVariantById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.variantService.deleteVariant(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Variant deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
