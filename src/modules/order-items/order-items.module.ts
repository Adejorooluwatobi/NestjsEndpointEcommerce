import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { OrderItemsController } from './controllers/order-items/order-items.controller';
import { OrderItemsService } from './services/order-items/order-items.service';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule to use OrdersService
import { OrderItemsResolver } from './order-items.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    OrdersModule, // Import OrdersModule to use OrdersService
    JwtModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsResolver],
  exports: [OrderItemsService]
})
export class OrderItemsModule {}