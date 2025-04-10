import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/database/entities/cards.entity';
import { CardItem } from 'src/database/entities/cardItems.entity';
import { CardsController } from './controllers/cards/cards.controller';
import { CardsService } from './services/cards/cards.service';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, CardItem]),
    CustomersModule, // Import CustomersModule to use CustomersService
    JwtModule,
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService]
})
export class CardsModule {}