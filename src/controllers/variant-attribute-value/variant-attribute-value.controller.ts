import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateVariantAttributeValueDto } from '../../DTOs/VariantAttributeDTO/CreateVariantAttributeValue.dto';
import { UpdateVariantAttributeValueDto } from '../../DTOs/VariantAttributeDTO/UpdateVariantAttributeValue.dto';
import { VariantAttributeValueService } from '../../Services/variant-attribute-value/variant-attribute-value.service';
import { ApiResponseDto, ErrorResponseDto, VariantAttributeValueResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(
    ApiResponseDto,
    ErrorResponseDto,
    VariantAttributeValueResponseDto
)
@Controller('variantAttributeValues')
export class VariantAttributeValueController {
    constructor(private readonly variantAttributeValueService: VariantAttributeValueService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new variant attribute value' })
        @ApiCreatedResponse({
            description: 'Variant Attribute value created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantAttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createVariantAttributeValue(@Body() createVariantAttributeValueDto: CreateVariantAttributeValueDto) {
        const varAttval = await this.variantAttributeValueService.createVariantAttributeValue(createVariantAttributeValueDto)
        return {
            succeeded: true,
            message: 'Variant Attribute Value created successfully',
            statusCode: 201,
            resultData: varAttval,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all variant attributes value' })
        @ApiOkResponse({
            description: 'Variant Attributes value retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(VariantAttributeValueResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getVariantAttributeValue() {
        const varAttval = await this.variantAttributeValueService.findVariantAttributeValue();
        return {
            succeeded: true,
            message: 'Variant Attribute Values retrieved successfully',
            statusCode: 200,
            resultData: varAttval,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get variant attribute value by ID' })
        @ApiOkResponse({
            description: 'Variant Attribute value retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantAttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Variant Attribute value not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getVariantAttributeValueById(@Param('id', ParseUUIDPipe) id: string) {
        const varAttval = await this.variantAttributeValueService.findVariantAttributeValueById(id);
        if(!varAttval) {
            return { error: true, message: 'Variant Attribute Value not found', statusCode: 404 };
        }
        return {
            succeeded: true,
            message: 'Variant Attribute Value retrieved successfully',
            statusCode: 200,
            resultData: varAttval,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update variant attribute value by ID' })
        @ApiOkResponse({
            description: 'Variant Attribute value updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(VariantAttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Variant Attribute Value not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateVariantAttributeValueById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateVariantAttributeValueDto: UpdateVariantAttributeValueDto,) {
            const varAttval = await this.variantAttributeValueService.updateVariantAttributeValue(id, UpdateVariantAttributeValueDto);
            if (!varAttval) {
                return { error: true, message: 'Variant Attribute Value not found', statusCode: 404 };
            }
            return {
                succeeded: true,
                message: 'Variant Attribute Value updated successfully',
                statusCode: 200,
                resultData: varAttval,
            };
        }
    
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteVariantAttributeValueById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.variantAttributeValueService.deleteVariantAttributeValue(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Variant Attribute Value deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
