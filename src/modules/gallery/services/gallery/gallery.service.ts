import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGalleryParams, UpdateGalleryParams } from 'src/utils/types';
import { CustomersService } from 'src/modules/customers/services/customers/customers.service';
import { Gallery, Product } from 'src/database/entities';
@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private customersService: CustomersService,
    ) {}

    findGallery() {
        return this.galleryRepository.find({  
        });
    }

    findGalleryById(id: string) {
        return this.galleryRepository.findOne({ 
            where: { id },
        });
    }

    async createGallery(galleryDetails: CreateGalleryParams) {

        
        // Create and save the gallery
        const newGallery = this.galleryRepository.create({
            ...galleryDetails
        });
        
        const savedGallery = await this.galleryRepository.save(newGallery);
        
        return this.findGalleryById(savedGallery.id);
    }

    async updateGallery(id: string, updateGalleryDetails: UpdateGalleryParams) {
        const gallery = await this.galleryRepository.findOne({ where: { id } });
        if (!gallery) {
            throw new NotFoundException('Gallery not found');
        }
        
        await this.galleryRepository.update(id, {
            ...updateGalleryDetails
        });
        
        return this.findGalleryById(id);
    }

    async deleteGallery(id: string) {
        const gallery = await this.galleryRepository.findOne({ where: { id } });
        if (!gallery) {
            throw new NotFoundException('Gallery not found');
        }
        // Then delete the gallery
        return this.galleryRepository.delete(id);
    }
}