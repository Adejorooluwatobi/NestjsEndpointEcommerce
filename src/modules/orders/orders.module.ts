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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderStatus, Coupon, Product]),
    CustomersModule, // Import CustomersModule to use CustomersService
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}