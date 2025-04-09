import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrdersModule } from 'src/orders/orders.module';
import { OrderItemsResolver } from './order-items.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    OrdersModule // Import OrdersModule to use OrdersService
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsResolver],
  exports: [OrderItemsService]
})
export class OrderItemsModule {}