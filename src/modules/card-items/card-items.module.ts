import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardItem } from 'src/database/entities/cardItems.entity';
import { CardItemsController } from './controllers/card-items/card-items.controller';
import { CardItemsService } from './services/card-items/card-items.service';
import { CardItemsResolver } from './card-items.resolver';
import { CardsModule } from '../cards/cards.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Card } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardItem, Card]),
    CardsModule, // Import CardsModule to use CardsService
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [CardItemsController],
  providers: [CardItemsService, CardItemsResolver],
  exports: [CardItemsService]
})
export class CardItemsModule {}