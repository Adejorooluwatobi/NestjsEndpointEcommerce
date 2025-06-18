import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateShippingDto } from '../../DTOs/ShippingDTO/CreateShipping.dto';
import { UpdateShippingDto } from '../../DTOs/ShippingDTO/UpdateShipping.dto';
import { StaffGuard, UniversalGuard, UserGuard } from 'src/security/auth/guards';
import { ShippingService } from '../../Services/shipping/shipping.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, ShippingResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(ShippingResponseDto)
@Controller('shipping')
export class ShippingController {
    constructor(private shippingService: ShippingService) {}

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Create a new shipping' })
        @ApiCreatedResponse({
            description: 'Shipping created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Shipping not found',
            type: ErrorResponseDto
        })
    @Post()
    async createShipping(@Body() createShippingDto: CreateShippingDto) {
        const ship = await this.shippingService.createShipping(createShippingDto);
        return {
            succeeded: true,
            message: 'Shipping created successfully',
            statusCode: 201,
            resultData: ship,
        };
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get all shipment' })
        @ApiOkResponse({
            description: 'Shipping retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(ShippingResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getShipping() {
        const ship = await this.shippingService.findShipping();
        return {
            succeeded: true,
            message: 'shipping retrieved successfully',
            statusCode: 200,
            resultData: ship,
        }
    }

    @UseGuards(UniversalGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get shipping by ID' })
        @ApiOkResponse({
            description: 'Shipping retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Shipping not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getShippingById(@Param('id') id: string) {
        const ship = await this.shippingService.findShippingById(id);
        if (!ship) {
            throw new Error('Shipping not found');
        }
        return {
            succeeded: true,
            message: 'Shipping retrieved successfully',
            statusCode: 200,
            resultData: ship,
        }
    }

    @UseGuards(StaffGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Update shipping by ID' })
        @ApiOkResponse({
            description: 'Shipping updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(ShippingResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Shipping not found',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateShippingById(
        @Param('id') id: string,
        @Body() updateShippingDto: UpdateShippingDto,) {
            const ship = await this.shippingService.updateShipping(id, updateShippingDto);
            if (!ship) {
                throw new Error('Shipping not found');
            }
            return {
                succeeded: true,
                message: 'Shipping updated successfully',
                statusCode: 200,
                resultData: ship,
            };
        }

        @UseGuards(UserGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteShippingById(
        @Param('id') id: string) {
            const result = await this.shippingService.deleteShipping(id);
            if (result.affected && result.affected > 0) {
                return {success: true, message: 'Shipping deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
        }

}
