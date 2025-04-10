import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/orders.entity';
import { OrderItem } from 'src/database/entities/orderItems.entity';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { Coupon } from 'src/database/entities/coupons.entity';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { CustomersModule } from 'src/modules/customers/customers.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderStatus, Coupon]),
    CustomersModule, // Import CustomersModule to use CustomersService
    JwtModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}