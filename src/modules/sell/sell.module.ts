import { Module } from '@nestjs/common';
import { SellResolver } from './sell.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Sell } from 'src/database/entities/sells.entity';
import { SellController } from './controllers/sell/sell.controller';
import { SellService } from './services/sell/sell.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sell]),
JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
      signOptions: { expiresIn: '24h' },
    }),
    inject: [ConfigService],
  }),],
  controllers: [SellController],
  providers: [SellResolver, SellService],
  exports: [SellService]
})
export class SellModule {}
