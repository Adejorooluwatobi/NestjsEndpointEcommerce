import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SlideBanner } from 'src/database/entities/slidebanners.entity';
import { CreateSlideBannerParams, UpdateSlideBannerParams } from 'src/utils/types';

@Injectable()
export class SlideBannerService {
    constructor(
        @InjectRepository(SlideBanner) private slideBannerRepository: Repository<SlideBanner>,
    ) {}

    findAllSliders() {
        return this.slideBannerRepository.find();
    }

    findSliderById(id: string) {
        return this.slideBannerRepository.findOne({ where: { id } });
    }

    async createSlideBanner(slideBannerDetails: CreateSlideBannerParams & { image: string }) {
        const { image, ...rest } = slideBannerDetails;
        const newSlideBanner = this.slideBannerRepository.create({
            ...rest,
            image,
        });
        const saved = await this.slideBannerRepository.save(newSlideBanner);
        return this.findSliderById(saved.id);
    }

    async updateSlideBanner(
        id: string,
        updateDetails: UpdateSlideBannerParams & { image?: string },
    ) {
        const { image, ...rest } = updateDetails;
        const banner = await this.slideBannerRepository.findOne({ where: { id } });
        if (!banner) throw new NotFoundException('Slide banner not found');

        const updateData: Partial<SlideBanner> = { ...rest };
        if (image) updateData.image = image;

        await this.slideBannerRepository.update(id, updateData);
        return this.findSliderById(id);
    }

    async deleteSlideBanner(id: string) {
        const banner = await this.slideBannerRepository.findOne({ where: { id } });
        if (!banner) throw new NotFoundException('Slide banner not found');
        return this.slideBannerRepository.delete(id);
    }
}