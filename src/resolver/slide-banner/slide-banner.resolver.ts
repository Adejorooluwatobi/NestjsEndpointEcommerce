import { Query, Resolver } from '@nestjs/graphql';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';
import { SlideBannerService } from 'src/Services/slide-banner/slide-banner.service';


@Resolver(() => SlideBanner)
export class ProfileResolver {
    constructor(private sliderBannerService: SlideBannerService) {}

    @Query(() => [SlideBanner], {name: 'sliderBanners'})
    async findTag(): Promise<SlideBanner[]> {
        return this.sliderBannerService.findAllSliders();
    }
}