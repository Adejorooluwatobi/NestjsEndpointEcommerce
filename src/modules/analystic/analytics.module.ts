import { Module } from '@nestjs/common';
import { AnalyticsController } from './controllers/analytics/analytics.controller';
import { AnalyticsService } from './services/analytics/analytics.service';
import { Analytics } from 'src/database/entities/analytics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Analytics]),
  JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}