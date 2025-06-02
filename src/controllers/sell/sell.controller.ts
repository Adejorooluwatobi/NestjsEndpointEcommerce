import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, ErrorResponseDto, SellResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { CreateSellDto } from 'src/DTOs/SellDTO/CreateSell.dto';
import { UpdateSellDto } from 'src/DTOs/SellDTO/UpdateSell.dto';
import { SellService } from 'src/Services/sell/sell.service';

@ApiExtraModels(SellResponseDto)
@Controller('sell')
export class SellController {
    constructor(private readonly sellService: SellService) {}

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Create a new sale' })
        @ApiOkResponse({
            description: 'Sale created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(SellResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Sale not found',
            type: ErrorResponseDto
        })
    @Post()
    async createSell(@Body() createSellDto: CreateSellDto) {
        const sell = await this.sellService.createSell(createSellDto)
        return {
            succeeded: true,
            message: 'Sale created successfully',
            statusCode: 201,
            resultData: sell,
        };
    }

    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @ApiOperation({ summary: 'Get all sales' })
        @ApiOkResponse({
            description: 'Sales retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(SellResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    @Get()
    async getSell() {
        const sell = await this.sellService.findSell();
        return {
            succeeded: true,
            message: 'Sales retrieved successfully',
            statusCode: 200,
            resultData: sell,
        };
    }

    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get sales by ID' })
        @ApiOkResponse({
            description: 'Sales retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(SellResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Sale not found',
            type: ErrorResponseDto
        })
    @Get(':id')
    async getSellById(@Param('id', ParseUUIDPipe) id: string) {
        const sell = await this.sellService.findSellById(id);
        if (!sell) {
            throw new Error('Sale not found');
        }
        return {
            succeeded: true,
            message: 'Sale retrieved successfully',
            statusCode: 200,
            resultData: sell,
        };
    }

    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @ApiOperation({ summary: 'Update sales by ID' })
        @ApiOkResponse({
            description: 'Sales updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(SellResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Sale not found',
            type: ErrorResponseDto
        })
    @Put(':id')
    async updateSellById(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() UpdateSellDto: UpdateSellDto,) {
            const sell = await this.sellService.updateSell(id, UpdateSellDto);
            if (!sell) {
                throw new Error('Sale not found');
            }
            return {
                succeeded: true,
                message: 'Sale updated successfully',
                statusCode: 200,
                resultData: sell,
            };
        }
    
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteSellById(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        const result = await this.sellService.deleteSell(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'Sales deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}
