import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEngagementController } from '../../controllers/customer-engagement/customer-engagement.controller';
import { CustomerEngagementService } from '../../Services/customer-engagement/customer-engagement.service';
import { Wishlist } from 'src/database/entities/customer-engagement_wishlist.entity';
import { Review } from 'src/database/entities/customer-engagement_review.entity';
import { Customer } from 'src/database/entities/customers.entity';
import { Product } from 'src/database/entities/products.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [TypeOrmModule.forFeature([Review, Wishlist, Customer, Product]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
          signOptions: { expiresIn: '24h' },
        }),
        inject: [ConfigService],
      }),],
  controllers: [CustomerEngagementController],
  providers: [CustomerEngagementService],
  exports: [CustomerEngagementService],
})
export class CustomerEngagementModule {}