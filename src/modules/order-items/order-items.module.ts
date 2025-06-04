import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { OrderItemsController } from '../../controllers/order-items/order-items.controller';
import { OrderItemsService } from '../../Services/order-items/order-items.service';
import { OrdersModule } from '../orders/orders.module'; // Import OrdersModule to use OrdersService
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from 'src/database/entities';
import { OrderItemsResolver } from 'src/resolver/order-items/order-items.resolver';
import { Order } from 'src/database/entities/orders.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem, Product, Order]),
    OrdersModule, // Import OrdersModule to use OrdersService
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsResolver],
  exports: [OrderItemsService]
})
export class OrderItemsModule {}