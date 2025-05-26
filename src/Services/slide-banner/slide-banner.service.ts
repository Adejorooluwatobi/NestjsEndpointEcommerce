import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlideBannerDto } from '../../DTOs/SliderBannerDTO/CreateSlideBanner.dto';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';


@Injectable()
export class SlideBannerService {
  constructor(
    @InjectRepository(SlideBanner) private slideBannerRepository: Repository<SlideBanner>,
  ) {}

  async createSlideBanner(id: string, createSlideBannerDetails: CreateSlideBannerDto) {

    const newSlideBanner = this.slideBannerRepository.create({
      ...createSlideBannerDetails,
    });
    return this.slideBannerRepository.save(newSlideBanner);
  }

  async findAllSliders(): Promise<SlideBanner[]> {
  return this.slideBannerRepository.find();
}

}