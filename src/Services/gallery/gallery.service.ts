import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGalleryParams, UpdateGalleryParams } from 'src/utils/types';
import { CustomersService } from 'src/Services/customers/customers.service';
import { Gallery, Product } from 'src/database/entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GalleryService {
    // private s3Client: S3Client;

    constructor(
        @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private customersService: CustomersService,
        private configService: ConfigService,
    ) {}

    findGallery() {
        return this.galleryRepository.find({
            relations: ['product'], // Include product relation if needed
        });
    }

    findGalleryById(id: string) {
        return this.galleryRepository.findOne({ 
            where: { id },
            relations: ['product'], // Include product relation if needed
        });
    }

    async createGallery(galleryDetails: CreateGalleryParams & { image: string }) {
        const { image, ...rest } = galleryDetails;

        const newGallery = this.galleryRepository.create({
            productId: rest.productId,
            image: image,
            thumbnail: image, // or generate a thumbnail if needed
            displayOrder: rest.displayOrder,
        });

        const savedGallery = await this.galleryRepository.save(newGallery);
        return this.findGalleryById(savedGallery.id);
    }

    async updateGallery(
        id: string,
        updateGalleryDetails: UpdateGalleryParams & { image?: string },
    ) {
        const { image, ...rest } = updateGalleryDetails;
        const gallery = await this.galleryRepository.findOne({ where: { id } });

        if (!gallery) {
            throw new NotFoundException('Gallery not found');
        }

        const updateData: Partial<Gallery> = { ...rest };

        if (image) {
            updateData.image = image;
            updateData.thumbnail = image;
        }

        await this.galleryRepository.update(id, updateData);
        return this.findGalleryById(id);
    }

    async deleteGallery(id: string) {
        const gallery = await this.galleryRepository.findOne({ where: { id } });
        if (!gallery) {
            throw new NotFoundException('Gallery not found');
        }
        
        // Optionally delete the image from cloud storage here
        // await this.deleteFromCloud(gallery.image);
        
        return this.galleryRepository.delete(id);
    }


    // Alternative method using Cloudinary (uncomment and modify as needed)
    /*
    private async uploadToCloudinary(file: Express.Multer.File): Promise<{ url: string }> {
        const cloudinary = require('cloudinary').v2;
        
        cloudinary.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });

        try {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'gallery',
                resource_type: 'auto',
            });

            // Delete the temporary file
            await fsPromises.unlink(file.path);

            return { url: result.secure_url };
        } catch (error) {
            await fsPromises.unlink(file.path).catch(e =>
                console.error('Failed to delete temp file:', e),
            );
            console.error('Error uploading to Cloudinary:', error);
            throw new InternalServerErrorException(
                'Failed to upload file to cloud storage.',
            );
        }
    }
    */
}