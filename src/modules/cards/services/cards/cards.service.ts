import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from 'src/database/entities/cards.entity';
import { CreateCardParams, UpdateCardParams } from 'src/utils/types';
import { CustomersService } from 'src/modules/customers/services/customers/customers.service';
import { CardItem } from 'src/database/entities/cardItems.entity';

@Injectable()
export class CardsService {
    constructor(
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        @InjectRepository(CardItem) private cardItemRepository: Repository<CardItem>,
        private customersService: CustomersService,
    ) {}

    findCards() {
        return this.cardRepository.find({ 
            relations: ['customer', 'cardItems'] 
        });
    }

    findCardById(id: string) {
        return this.cardRepository.findOne({ 
            where: { id },
            relations: ['customer', 'cardItems']
        });
    }

    async findCardsByCustomerId(customerId: string) {
        // Verify customer exists first
        const customer = await this.customersService.findCustomerById(customerId);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        
        return this.cardRepository.find({
            where: { customer_id: customerId },
            relations: ['cardItems']
        });
    }

    async createCard(cardDetails: CreateCardParams) {
        // Verify customer exists first
        const customer = await this.customersService.findCustomerById(cardDetails.customer_id);
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        
        // Create and save the card
        const newCard = this.cardRepository.create({
            ...cardDetails
        });
        
        const savedCard = await this.cardRepository.save(newCard);
        
        // Create card items if provided
        if (cardDetails.cardItems && cardDetails.cardItems.length > 0) {
            const cardItems = cardDetails.cardItems.map(item => {
                return this.cardItemRepository.create({
                    ...item,
                    card_id: savedCard.id
                });
            });
            await this.cardItemRepository.save(cardItems);
        }
        
        return this.findCardById(savedCard.id);
    }

    async updateCard(id: string, updateCardDetails: UpdateCardParams) {
        const card = await this.cardRepository.findOne({ where: { id } });
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        
        await this.cardRepository.update(id, {
            ...updateCardDetails
        });
        
        return this.findCardById(id);
    }

    async deleteCard(id: string) {
        const card = await this.cardRepository.findOne({ where: { id } });
        if (!card) {
            throw new NotFoundException('Card not found');
        }
        
        // Delete associated card items first
        await this.cardItemRepository.delete({ card_id: id });
        
        // Then delete the card
        return this.cardRepository.delete(id);
    }
}