import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from '../../services/cards/cards.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardDto } from '../../dtos/CreateCard.dto';
import { UpdateCardDto } from '../../dtos/UpdateCard.dto';

@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @UseGuards(CustomerGuard)
    @Get()
    async getCards() {
        return this.cardsService.findCards();
    }

    @UseGuards(CustomerGuard)
    @Get(':id')
    async getCardById(@Param('id', ParseUUIDPipe) id: string) {
        return this.cardsService.findCardById(id);
    }

    @UseGuards(CustomerGuard)
    @Get('customer/:customerId')
    async getCardsByCustomerId(@Param('customerId', ParseUUIDPipe) customerId: string) {
        return this.cardsService.findCardsByCustomerId(customerId);
    }

    @UseGuards(CustomerGuard)
    @Post()
    createCard(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.createCard(createCardDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateCardById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCardDto: UpdateCardDto) {
            return this.cardsService.updateCard(id, updateCardDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteCardById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.cardsService.deleteCard(id);
    }
}