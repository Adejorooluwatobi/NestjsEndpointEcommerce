import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardItemsService } from '../../Services/card-items/card-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardItemDto } from '../../DTOs/CardItemDTO/CreateCardItems.dto';
import { UpdateCardItemDto } from '../../DTOs/CardItemDTO/UpdateCardItems.dto';
import { UserGuard } from 'src/security/auth/guards';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto, CardItemsResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';

@ApiExtraModels(CardItemsResponseDto)
@Controller('card-items')
export class CardItemsController {
    constructor(private cardItemsService: CardItemsService) {}

    @UseGuards(UserGuard)
    @ApiBearerAuth()
        @Get()
        @ApiOperation({ summary: 'Get all card items' })
        @ApiOkResponse({
            description: 'card items retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(CardItemsResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    async getCardItems() {
        const cardItems = await this.cardItemsService.findCardItems();
        if (!cardItems || cardItems.length === 0) {
            throw new Error('No card items found');
        }
        return {
            succeeded: true,
            message: 'Card items retrieved successfully',
            statusCode: 200,
            resultData: cardItems,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
        @Get(':id')
        @ApiOperation({ summary: 'Get card items by ID' })
        @ApiOkResponse({
            description: 'Card Items retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'card items not found',
            type: ErrorResponseDto
        })
    async getCardItemById(@Param('id', ParseUUIDPipe) id: string) {
        const cardItems = await this.cardItemsService.findCardItemById(id);
        if (!cardItems) {
            throw new Error(`Card item with ID ${id} not found`);
        }
        return {
            succeeded: true,
            message: 'Card item retrieved successfully',
            statusCode: 200,
            resultData: cardItems,
        };
    }

    @UseGuards(CustomerGuard, UserGuard)
    @ApiBearerAuth()
        @ApiOperation({ summary: 'Get card items by cardID' })
        @ApiOkResponse({
            description: 'card items retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Card items not found',
            type: ErrorResponseDto
        })
    @Get('card/:cardId')
    async getCardItemsByCardId(@Param('cardId', ParseUUIDPipe) cardId: string) {
        const carditems = await this.cardItemsService.findCardItemsByCardId(cardId);
        if (!carditems || carditems.length === 0) {
            throw new Error(`Card items with Card ID ${cardId} not found`);
        }
        return {
            succeeded: true,
            message: 'Card items retrieved successfully',
            statusCode: 200,
            resultData: carditems,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiOperation({ summary: 'Create a new Card Items Record' })
        @ApiCreatedResponse({
            description: 'Card Items created successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiBadRequestResponse({
            description: 'Invalid input data',
            type: ErrorResponseDto
        })
    @Post()
    async createCardItem(@Body() createCardItemDto: CreateCardItemDto) {
        const carditems = await this.cardItemsService.createCardItem(createCardItemDto);
        return {
            succeeded: true,
            message: 'Card item created successfully',
            statusCode: 201,
            resultData: carditems,
        };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth()
        @Put(':id')
        @ApiOperation({ summary: 'Update card items by ID' })
        @ApiOkResponse({
            description: 'Card Items updated successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardItemsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({ description: 'card items not found', type: ErrorResponseDto })
        @ApiBadRequestResponse({ description: 'Invalid input data', type: ErrorResponseDto })
    async updateCardItemById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCardItemDto: UpdateCardItemDto) {
            const cardItems = await this.cardItemsService.updateCardItem(id, updateCardItemDto);
            if (!cardItems) {
                throw new Error(`Card item with ID ${id} not found`);
            }
            return {
                succeeded: true,
                message: 'Card item updated successfully',
                statusCode: 200,
                resultData: cardItems,
            };
    }

    @UseGuards(CustomerGuard)
    @ApiBearerAuth() // Added ApiBearerAuth for consistency
        @Delete(':id')
        @ApiOperation({ summary: 'Delete by ID' })
        @ApiNoContentResponse({ description: 'deleted successfully' })
        @ApiNotFoundResponse({ description: 'ot found', type: ErrorResponseDto })
    async deleteCardItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        const result = await this.cardItemsService.deleteCardItem(id);
        if (result.affected && result.affected > 0) {
                return {success: true, message: 'CardItems deleted successfully'};
            } else {
                return {error: false, message: 'not found.'}
            }
    }
}