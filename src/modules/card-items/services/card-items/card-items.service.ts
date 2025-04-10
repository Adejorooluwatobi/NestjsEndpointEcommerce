import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardItem } from 'src/database/entities/cardItems.entity';
import { CreateCardItemParams, UpdateCardItemParams } from 'src/utils/types';
import { CardsService } from 'src/modules/cards/services/cards/cards.service';


@Injectable()
export class CardItemsService {
    constructor(
        @InjectRepository(CardItem) private cardItemRepository: Repository<CardItem>,
        private cardsService: CardsService,
    ) {}

    findCardItems() {
        return this.cardItemRepository.find({ 
            relations: ['card', 'product'] 
        });
    }

    findCardItemById(id: string) {
        return this.cardItemRepository.findOne({ 
            where: { id },
            relations: ['card', 'product']
        });
    }

    async findCardItemsByCardId(cardId: string) {
        // Verify card exists first
        const card = await this.cardsService.findCardById(cardId);
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        
        return this.cardItemRepository.find({
            where: { card_id: cardId },
            relations: ['product']
        });
    }

    async createCardItem(cardItemDetails: CreateCardItemParams) {
        // Verify card exists first
        const card = await this.cardsService.findCardById(cardItemDetails.card_id);
        if (!card) {
            throw new NotFoundException('Card not found');
        }

        // Create and save the card item
        const newCardItem = this.cardItemRepository.create({
            ...cardItemDetails
        });
        
        return this.cardItemRepository.save(newCardItem);
    }

    async updateCardItem(id: string, updateCardItemDetails: UpdateCardItemParams) {
        const cardItem = await this.cardItemRepository.findOne({ where: { id } });
        if (!cardItem) {
            throw new NotFoundException('Card item not found');
        }
        
        await this.cardItemRepository.update(id, {
            ...updateCardItemDetails
        });
        
        return this.findCardItemById(id);
    }

    async deleteCardItem(id: string) {
        const cardItem = await this.cardItemRepository.findOne({ where: { id } });
        if (!cardItem) {
            throw new NotFoundException('Card item not found');
        }
        
        return this.cardItemRepository.delete(id);
    }
}