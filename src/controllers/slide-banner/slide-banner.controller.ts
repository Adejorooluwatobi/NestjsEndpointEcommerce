import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateSlideBannerDto } from 'src/DTOs/SliderBannerDTO/CreateSlideBanner.dto';
import { SlideBannerService } from 'src/Services/slide-banner/slide-banner.service';



@Controller('users/:id/posts')
export class SlideBannerController {
  constructor(private readonly postService: SlideBannerService) {}

  @Post()
  createSlideBanner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createSlideBannerDto: CreateSlideBannerDto,
  ) {
    return this.postService.createSlideBanner(id, createSlideBannerDto);
  }

  @Get()
  getSlideBanners() {
    return this.postService.findAllSliders();
  }
}