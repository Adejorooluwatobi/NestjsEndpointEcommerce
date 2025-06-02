import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AttributeService } from '../../Services/attribute/attribute.service';
import { CreateAttributeDto } from '../../DTOs/AttributeDTO/CreateAttribute.dto';
import { UpdateAttributeDto } from '../../DTOs/AttributeDTO/UpdateAttribute.dto';
import { CustomerGuard, StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, AttributeResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(AttributeResponseDto)
@Controller('attribute')
export class AttributeController {
    constructor(private attributeService: AttributeService) {}

    @UseGuards(UserGuard)
    @Post()
    @ApiOperation({ summary: 'Create a new attribute' })
    @ApiCreatedResponse({
        description: 'Attribute created successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(AttributeResponseDto) }
                    }
                }
            ]
        }
    })
    @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    async createAttribute(@Body() createAttributeDto: CreateAttributeDto) {
        const attribute = await this.attributeService.createAttribute(createAttributeDto);
        return {
            succeeded: true,
            message: 'Attribute created successfully',
            statusCode: 201,
            resultData: attribute,
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
                            items: { $ref: getSchemaPath(AttributeResponseDto) }
                        }
                    }
                }
            ]
        }
    })
    @Get()
    async getAttribute() {
        const attribute = this.attributeService.findAttribute();
        return {
            succeeded: true,
            message: 'Attributes retrieved successfully',
            statusCode: 200,
            resultData: attribute,
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
                        resultData: { $ref: getSchemaPath(AttributeResponseDto) }
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
    async getAttributeById(@Param('id') id: string) {
        const attribute = await this.attributeService.findAttributeById(id);
        if (!attribute) {
            throw new Error(`Attribute with ID ${id}not found`);
        }
        return {
            succeeded: true,
            message: 'Attribute retrieved successfully',
            statusCode: 200,
            resultData: attribute,
        };
    }

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update attribute by ID' })
    @ApiOkResponse({
        description: 'Attribute updated successfully',
        schema: {
            allOf: [
                { $ref: getSchemaPath(ApiResponseDto) },
                {
                    properties: {
                        resultData: { $ref: getSchemaPath(AttributeResponseDto) }
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
    async updateAttributeById(
        @Param('id') id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,) {
            const attribute = await this.attributeService.updateAttribute(id, updateAttributeDto)
        if (!attribute) {
            throw new Error(`Attribute with ID ${id} not found`);
        }
            return {
                succeeded: true,
                message: 'Attribute updated successfully',
                statusCode: 200,
                resultData: attribute,
            };
        }

        @UseGuards(UserGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteAttributeById(
        @Param('id') id: string) {
            const result = await this.attributeService.deleteAttribute(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Attribute deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
