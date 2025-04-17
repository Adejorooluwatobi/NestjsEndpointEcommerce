import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardsService } from '../../services/cards/cards.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardDto } from '../../dtos/CreateCard.dto';
import { UpdateCardDto } from '../../dtos/UpdateCard.dto';
import { StaffGuard, UserGuard } from 'src/security/auth/guards';

@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @UseGuards(UserGuard, StaffGuard)
    @Get()
    async getCards() {
        return this.cardsService.findCards();
    }

    @UseGuards(CustomerGuard, UserGuard)
    @Get(':id')
    async getCardById(@Param('id', ParseUUIDPipe) id: string) {
        return this.cardsService.findCardById(id);
    }

    @UseGuards(UserGuard)
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