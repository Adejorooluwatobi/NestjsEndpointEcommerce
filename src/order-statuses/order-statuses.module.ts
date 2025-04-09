import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { OrderStatusesController } from './controllers/order-statuses/order-statuses.controller';
import { OrderStatusesService } from './services/order-statuses/order-statuses.service';
import { OrderStatusesResolver } from './order-statuses.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatus])
  ],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService, OrderStatusesResolver],
  exports: [OrderStatusesService]
})
export class OrderStatusesModule {}