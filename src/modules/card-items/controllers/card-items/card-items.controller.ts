import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardItemsService } from '../../services/card-items/card-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardItemDto } from '../../dtos/CreateCardItems.dto';
import { UpdateCardItemDto } from '../../dtos/UpdateCardItems.dto';

@Controller('card-items')
export class CardItemsController {
    constructor(private cardItemsService: CardItemsService) {}

    @UseGuards(CustomerGuard)
    @Get()
    async getCardItems() {
        return this.cardItemsService.findCardItems();
    }

    @UseGuards(CustomerGuard)
    @Get(':id')
    async getCardItemById(@Param('id', ParseUUIDPipe) id: string) {
        return this.cardItemsService.findCardItemById(id);
    }

    @UseGuards(CustomerGuard)
    @Get('card/:cardId')
    async getCardItemsByCardId(@Param('cardId', ParseUUIDPipe) cardId: string) {
        return this.cardItemsService.findCardItemsByCardId(cardId);
    }

    @UseGuards(CustomerGuard)
    @Post()
    createCardItem(@Body() createCardItemDto: CreateCardItemDto) {
        return this.cardItemsService.createCardItem(createCardItemDto);
    }

    @UseGuards(CustomerGuard)
    @Put(':id')
    async updateCardItemById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() updateCardItemDto: UpdateCardItemDto) {
            return this.cardItemsService.updateCardItem(id, updateCardItemDto);
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
    async deleteCardItemById(
        @Param('id', ParseUUIDPipe) id: string) {
        await this.cardItemsService.deleteCardItem(id);
    }
}