import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';
import { SlideBannerService } from '../../Services/slide-banner/slide-banner.service';
import { SlideBannerController } from 'src/controllers/slide-banner/slide-banner.controller';



@Module({
  imports: [TypeOrmModule.forFeature([SlideBanner])],
  controllers: [SlideBannerController],
  providers: [SlideBannerService],
  exports: [SlideBannerService],
})
export class SlideBannerModule {}