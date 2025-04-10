import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { OrderStatusesController } from './controllers/order-statuses/order-statuses.controller';
import { OrderStatusesService } from './services/order-statuses/order-statuses.service';
import { OrderStatusesResolver } from './order-statuses.resolver';
import { AuthModule } from 'src/security/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatus]), AuthModule,
  ],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService, OrderStatusesResolver],
  exports: [OrderStatusesService]
})
export class OrderStatusesModule {}