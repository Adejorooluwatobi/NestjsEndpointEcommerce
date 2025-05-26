import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CardsService } from '../../Services/cards/cards.service';
import { Card } from 'src/database/entities/cards.entity';
import { CreateCardDto } from '../../DTOs/CardDTO/CreateCard.dto';
import { UpdateCardDto } from '../../DTOs/CardDTO/UpdateCard.dto';
import { UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private cardsService: CardsService) {}

  @Query(() => [Card], { name: 'cards' })
  @UseGuards(CustomerGuard)
  async findCards(): Promise<Card[]> {
    return this.cardsService.findCards();
  }

  @Query(() => Card, { name: 'card' })
  @UseGuards(CustomerGuard)
  async findCardById(@Args('id') id: string): Promise<Card> {
    const card = await this.cardsService.findCardById(id);
    if (!card) {
      throw new Error(`Card with ID ${id} not found`);
    }
    return card;
  }

  @Query(() => [Card], { name: 'customerCards' })
  @UseGuards(CustomerGuard)
  async findCardsByCustomerId(@Args('customerId') customerId: string): Promise<Card[]> {
    return this.cardsService.findCardsByCustomerId(customerId);
  }

  @Mutation(() => Card)
  @UseGuards(CustomerGuard)
  async createCard(@Args('createCardInput') createCardDto: CreateCardDto): Promise<Card> {
    const card = await this.cardsService.createCard(createCardDto);
    if (!card) {
      throw new Error('Failed to create card');
    }
    return card;
  }

  @Mutation(() => Card)
  @UseGuards(CustomerGuard)
  async updateCard(
    @Args('id') id: string, 
    @Args('updateCardInput') updateCardDto: UpdateCardDto
  ): Promise<Card> {
    const updatedCard = await this.cardsService.updateCard(id, updateCardDto);
    if (!updatedCard) {
      throw new Error(`Failed to update card with ID ${id}`);
    }
    return updatedCard;
  }

  @Mutation(() => Boolean)
  @UseGuards(CustomerGuard)
  async deleteCard(@Args('id') id: string): Promise<boolean> {
    await this.cardsService.deleteCard(id);
    return true;
  }
}