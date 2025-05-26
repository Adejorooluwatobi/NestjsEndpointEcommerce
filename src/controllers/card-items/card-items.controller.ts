import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CardItemsService } from '../../Services/card-items/card-items.service';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardItemDto } from '../../DTOs/CardItemDTO/CreateCardItems.dto';
import { UpdateCardItemDto } from '../../DTOs/CardItemDTO/UpdateCardItems.dto';
import { UserGuard } from 'src/security/auth/guards';

@Controller('card-items')
export class CardItemsController {
    constructor(private cardItemsService: CardItemsService) {}

    @UseGuards(UserGuard)
    @Get()
    async getCardItems() {
        return this.cardItemsService.findCardItems();
    }

    @UseGuards(CustomerGuard)
    @Get(':id')
    async getCardItemById(@Param('id', ParseUUIDPipe) id: string) {
        return this.cardItemsService.findCardItemById(id);
    }

    @UseGuards(CustomerGuard, UserGuard)
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
            await this.cardItemsService.updateCardItem(id, updateCardItemDto);
            return this.cardItemsService.findCardItemById(id)
    }

    @UseGuards(CustomerGuard)
    @Delete(':id')
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