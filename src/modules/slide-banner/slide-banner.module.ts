import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';
import { SlideBannerService } from '../../Services/slide-banner/slide-banner.service';
import { SlideBannerController } from 'src/controllers/slide-banner/slide-banner.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SlideBanner]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your_jwt_secret_key_change_in_production',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [SlideBannerController],
  providers: [SlideBannerService],
  exports: [SlideBannerService],
})
export class SlideBannerModule {}