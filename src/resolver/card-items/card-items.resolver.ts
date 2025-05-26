import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CardItemsService } from '../../Services/card-items/card-items.service';
import { CardItem } from 'src/database/entities/cardItems.entity';
import { UseGuards } from '@nestjs/common';
import { CustomerGuard } from 'src/security/auth/guards/customer.guard';
import { CreateCardItemDto } from '../../DTOs/CardItemDTO/CreateCardItems.dto';
import { UpdateCardItemDto } from '../../DTOs/CardItemDTO/UpdateCardItems.dto';

@Resolver(() => CardItem)
export class CardItemsResolver {
  constructor(private cardItemsService: CardItemsService) {}

  @Query(() => [CardItem], { name: 'cardItems' })
  @UseGuards(CustomerGuard)
  async findCardItems(): Promise<CardItem[]> {
    return this.cardItemsService.findCardItems();
  }

  @Query(() => CardItem, { name: 'cardItem' })
  @UseGuards(CustomerGuard)
  async findCardItemById(@Args('id') id: string): Promise<CardItem> {
    const cardItem = await this.cardItemsService.findCardItemById(id);
    if (!cardItem) {
      throw new Error(`CardItem with id ${id} not found`);
    }
    return cardItem;
  }

  @Query(() => [CardItem], { name: 'cardItemsByCardId' })
  @UseGuards(CustomerGuard)
  async findCardItemsByCardId(@Args('cardId') cardId: string): Promise<CardItem[]> {
    return this.cardItemsService.findCardItemsByCardId(cardId);
  }

  @Mutation(() => CardItem)
  @UseGuards(CustomerGuard)
  async createCardItem(
    @Args('createCardItemInput') createCardItemDto: CreateCardItemDto
  ): Promise<CardItem> {
    return this.cardItemsService.createCardItem(createCardItemDto);
  }

  @Mutation(() => CardItem)
  @UseGuards(CustomerGuard)
  async updateCardItem(
    @Args('id') id: string, 
    @Args('updateCardItemInput') updateCardItemDto: UpdateCardItemDto
  ): Promise<CardItem> {
    const updatedCardItem = await this.cardItemsService.updateCardItem(id, updateCardItemDto);
    if (!updatedCardItem) {
      throw new Error(`CardItem with id ${id} could not be updated or does not exist`);
    }
    return updatedCardItem;
  }

  @Mutation(() => Boolean)
  @UseGuards(CustomerGuard)
  async deleteCardItem(@Args('id') id: string): Promise<boolean> {
    await this.cardItemsService.deleteCardItem(id);
    return true;
  }
}