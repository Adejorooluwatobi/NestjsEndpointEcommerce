import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';
import { SlideBannerController } from './controllers/slide-banner/slide-banner.controller';
import { SlideBannerService } from './services/slide-banner/slide-banner.service';



@Module({
  imports: [TypeOrmModule.forFeature([SlideBanner])],
  controllers: [SlideBannerController],
  providers: [SlideBannerService]
})
export class SlideBannerModule {}