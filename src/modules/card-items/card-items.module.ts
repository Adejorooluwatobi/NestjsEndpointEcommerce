import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardItem } from 'src/database/entities/cardItems.entity';
import { CardItemsController } from './controllers/card-items/card-items.controller';
import { CardItemsService } from './services/card-items/card-items.service';
import { CardItemsResolver } from './card-items.resolver';
import { CardsModule } from '../cards/cards.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardItem]),
    CardsModule, // Import CardsModule to use CardsService
    JwtModule,
  ],
  controllers: [CardItemsController],
  providers: [CardItemsService, CardItemsResolver],
  exports: [CardItemsService]
})
export class CardItemsModule {}