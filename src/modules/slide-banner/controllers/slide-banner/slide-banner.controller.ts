import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateSlideBannerDto } from '../../dtos/CreateSlideBanner.dto';
import { SlideBannerService } from '../../services/slide-banner/slide-banner.service';


@Controller('users/:id/posts')
export class SlideBannerController {
  constructor(private readonly postService: SlideBannerService) {}

  @Post()
  createSlideBanner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createSlideBannerDto: CreateSlideBannerDto,
  ) {
    return this.postService.createSlideBanner(id.toString(), createSlideBannerDto);
  }

  // @Get()
  // getSlideBanners(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.postService.getSlideBanners(id.toString());
  // }
}