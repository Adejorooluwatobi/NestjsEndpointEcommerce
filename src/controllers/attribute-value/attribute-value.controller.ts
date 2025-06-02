import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { AttributeValueService } from '../../Services/attribute-value/attribute-value.service';
import { CreateAttributeValueDto } from '../../DTOs/AttributeValueDTO/CreateAttribute.dto';
import { UpdateAttributeValueDto } from '../../DTOs/AttributeValueDTO/UpdateAttribute.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, AttributeValueResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(AttributeValueResponseDto)
@Controller('attributeValue')
export class AttributeValueController {
    constructor(private attributeValueService: AttributeValueService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new attribute value' })
        @ApiCreatedResponse({
            description: 'Attribute value created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(AttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
                description: 'Invalid input data',
                type: ErrorResponseDto
            })
    async createAttributeValue(@Body() createAttributeValueDto: CreateAttributeValueDto) {
        const attributeValue = await this.attributeValueService.createAttributeValue(createAttributeValueDto);
        return {
            succeeded: true,
            message: 'Attribute Value created successfully',
            statusCode: 201,
            resultData: attributeValue,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
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
                                items: { $ref: getSchemaPath(AttributeValueResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getAttributeValue() {
        const attributeValue = await this.attributeValueService.findAttributeValue();
        return {
            succeeded: true,
            message: 'Attribute Values retrieved successfully',
            statusCode: 200,
            resultData: attributeValue,
        };
    }

    @UseGuards(CustomerGuard, UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get attribute by ID' })
        @ApiOkResponse({
            description: 'Attribute retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(AttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Attribute not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getAttributeValueById(@Param('id') id: string) {
        const attributeValue = await this.attributeValueService.findAttributeValueById(id);
        if (!attributeValue) {
            throw new Error(`Attribute Value with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Attribute Value retrieved successfully',
            statusCode: 200,
            resultData: attributeValue,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update attribute value by ID' })
        @ApiOkResponse({
            description: 'Attribute value updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(AttributeValueResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Attribute not found',
            type: ErrorResponseDto
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateAttributeValueById(
        @Param('id') id: string,
        @Body() updateAttributeValueDto: UpdateAttributeValueDto,) {
            const attributeValues = await this.attributeValueService.updateAttributeValue(id, updateAttributeValueDto);
        if (!attributeValues) {
            throw new Error(`Attribute Value with ID ${id} not found`);
        }
            return {
                succeeded: true,
                message: 'Attribute Value updated successfully',
                statusCode: 200,
                resultData: attributeValues,
            };
        }

        @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteAttributeValueById(
        @Param('id') id: string) {
            const result = await this.attributeValueService.deleteAttributeValue(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Attribute Value deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
