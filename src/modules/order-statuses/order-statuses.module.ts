import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from 'src/database/entities/orderStatuses.entity';
import { OrderStatusesController } from '../../controllers/order-statuses/order-statuses.controller';
import { OrderStatusesService } from '../../Services/order-statuses/order-statuses.service';
import { AuthModule } from 'src/security/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { OrderStatusesResolver } from 'src/resolver/order-statuses/order-statuses.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatus]), AuthModule,
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),
  ],
  controllers: [OrderStatusesController],
  providers: [OrderStatusesService, OrderStatusesResolver],
  exports: [OrderStatusesService]
})
export class OrderStatusesModule {}