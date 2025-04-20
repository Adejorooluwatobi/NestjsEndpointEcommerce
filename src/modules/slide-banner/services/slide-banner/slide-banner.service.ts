import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSlideBannerDto } from '../../dtos/CreateSlideBanner.dto';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';


@Injectable()
export class SlideBannerService {
  constructor(
    @InjectRepository(SlideBanner) private postRepository: Repository<SlideBanner>,
  ) {}

  async createSlideBanner(id: string, createSlideBannerDetails: CreateSlideBannerDto) {

    const newSlideBanner = this.postRepository.create({
      ...createSlideBannerDetails,
    });
    return this.postRepository.save(newSlideBanner);
  }

}