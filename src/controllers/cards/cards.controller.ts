import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from '../../Services/cards/cards.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardDto } from '../../DTOs/CardDTO/CreateCard.dto';
import { UpdateCardDto } from '../../DTOs/CardDTO/UpdateCard.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';
import { ApiResponseDto, CardsResponseDto, ErrorResponseDto } from 'src/DTOs/ResponseDTOs/response.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

@ApiExtraModels(CardsResponseDto)
@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @UseGuards(UserGuard, StaffGuard)
    @ApiBearerAuth()
        @Get()
        @ApiOperation({ summary: 'Get all cards' })
        @ApiOkResponse({
            description: 'cards retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: {
                                type: 'array',
                                items: { $ref: getSchemaPath(CardsResponseDto) }
                            }
                        }
                    }
                ]
            }
        })
    async getCards() {
        const cards = await this.cardsService.findCards();
        if (!cards || cards.length === 0) {
            return {
                succeeded: false,
                message: 'No cards found',
                statusCode: 404,
            };
        }
        return {
            succeeded: true,
            message: 'Cards retrieved successfully',
            statusCode: 200,
            resultData: cards,
        };
    }

    @UseGuards(CustomerGuard, UserGuard)
    @ApiBearerAuth()
        @Get(':id')
        @ApiOperation({ summary: 'Get card by ID' })
        @ApiOkResponse({
            description: 'Card retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Card not found',
            type: ErrorResponseDto
        })
    async getCardById(@Param('id', ParseUUIDPipe) id: string) {
        const cards = await this.cardsService.findCardById(id);
        if (!cards) {
            return {
                succeeded: false,
                message: `Card with ID ${id} not found`,
                statusCode: 404,
            };
        }
        return {
            succeeded: true,
            message: 'Card retrieved successfully',
            statusCode: 200,
            resultData: cards,
        };
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Get('customer/:customerId')
    @ApiOperation({ summary: 'Get card by CustomerID' })
        @ApiOkResponse({
            description: 'Card retrieved successfully',
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            resultData: { $ref: getSchemaPath(CardsResponseDto) }
                        }
                    }
                ]
            }
        })
        @ApiNotFoundResponse({
            description: 'Customer Card not found',
            type: ErrorResponseDto
        })
    async getCardsByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string) {
        const card =await this.cardsService.findCardsByCustomerId(customerId);
        if (!card) {
            return {
                succeeded: false,
                message: `No cards found for customer with ID ${customerId}`,
                statusCode: 404,
            };
        }
        return {
            succeeded: true,
            message: 'Card retrieved successfully',
            statusCode: 200,
            resultData: card,
        };
    }

    // Updated createCard method in your controller
@UseGuards(CustomerGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Create a new Card Record' })
@ApiCreatedResponse({
    description: 'Card created successfully',
    schema: {
        allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
                properties: {
                    resultData: { $ref: getSchemaPath(CardsResponseDto) }
                }
            }
        ]
    }
})
@ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
})
@ApiConflictResponse({
    description: 'Card info already exists'
})
@Post()
async createCard(@Body() createCardDto: CreateCardDto) {
    // Check if card number is available
    const isAvailable = await this.cardsService.isCardNumberAvailable(createCardDto.cardNumber);
    
    if (!isAvailable) {
        return {
            succeeded: false,
            message: `Card with this card number ${createCardDto.cardNumber} already exists`,
            statusCode: 409,
        };
    }
    
    const card = await this.cardsService.createCard(createCardDto);
    return {
        succeeded: true,
        message: 'Card created successfully',
        statusCode: 201,
        resultData: card,
    };
}

// You could also add a dedicated endpoint to check card number availability
@UseGuards(UserGuard)
@ApiBearerAuth()
@Get('check-availability/:cardNumber')
@ApiOperation({ summary: 'Check if card number is available' })
@ApiOkResponse({
    description: 'Card number availability checked',
    schema: {
        allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
                properties: {
                    resultData: { 
                        type: 'object',
                        properties: {
                            cardNumber: { type: 'string' },
                            isAvailable: { type: 'boolean' }
                        }
                    }
                }
            }
        ]
    }
})
async checkCardNumberAvailability(@Param('cardNumber') cardNumber: string) {
    const isAvailable = await this.cardsService.isCardNumberAvailable(cardNumber);
    
    return {
        succeeded: true,
        message: 'Card number availability checked successfully',
        statusCode: 200,
        resultData: {
            cardNumber,
            isAvailable
        },
    };
}

    @UseGuards(CustomerGuard)
@ApiBearerAuth()
@Put(':id')
@ApiOperation({ summary: 'Update card by ID' })
@ApiOkResponse({
    description: 'Card updated successfully',
    schema: {
        allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
                properties: {
                    resultData: { $ref: getSchemaPath(CardsResponseDto) }
                }
            }
        ]
    }
})
@ApiNotFoundResponse({
    description: 'Card not found',
    type: ErrorResponseDto
})
@ApiBadRequestResponse({
    description: 'Invalid input data',
    type: ErrorResponseDto
})
async updateCardById(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCardDto: UpdateCardDto
) {
    try {
        // Check if card exists before updating
        const existingCard = await this.cardsService.findCardById(id);
        if (!existingCard) {
            return {
                succeeded: false,
                message: 'Card not found',
                statusCode: 404,
            };
        }

        // If updating card number, check if the new card number is available
        if (updateCardDto.cardNumber && updateCardDto.cardNumber !== existingCard.cardNumber) {
            const isAvailable = await this.cardsService.isCardNumberAvailable(updateCardDto.cardNumber);
            if (!isAvailable) {
                return {
                    succeeded: false,
                    message: `Card with this card number ${updateCardDto.cardNumber} already exists`,
                    statusCode: 409,
                };
            }
        }

        const updatedCard = await this.cardsService.updateCard(id, updateCardDto);
        return {
            succeeded: true,
            message: 'Card updated successfully',
            statusCode: 200,
            resultData: updatedCard,
        };
    } catch (error) {
        return {
            succeeded: false,
            message: error.message || 'Failed to update card',
            statusCode: 500,
        };
    }
}

@UseGuards(CustomerGuard)
@ApiBearerAuth()
@Delete(':id')
@ApiOperation({ summary: 'Delete card by ID' })
@ApiOkResponse({
    description: 'Card deleted successfully',
    schema: {
        allOf: [
            { $ref: getSchemaPath(ApiResponseDto) },
            {
                properties: {
                    resultData: { 
                        type: 'object',
                        properties: {
                            deletedCardId: { type: 'string' }
                        }
                    }
                }
            }
        ]
    }
})
@ApiNotFoundResponse({
    description: 'Card not found',
    type: ErrorResponseDto
})
async deleteCardById(@Param('id', ParseUUIDPipe) id: string) {
    try {
        // Check if card exists before deleting
        const existingCard = await this.cardsService.findCardById(id);
        if (!existingCard) {
            return {
                succeeded: false,
                message: 'Card not found',
                statusCode: 404,
            };
        }

        const result = await this.cardsService.deleteCard(id);
        
        if (result.affected && result.affected > 0) {
            return {
                succeeded: true,
                message: 'Card deleted successfully',
                statusCode: 200,
                resultData: {
                    deletedCardId: id
                }
            };
        } else {
            return {
                succeeded: false,
                message: 'Failed to delete card',
                statusCode: 500,
            };
        }
    } catch (error) {
        return {
            succeeded: false,
            message: error.message || 'Failed to delete card',
            statusCode: 500,
        };
    }
}
}