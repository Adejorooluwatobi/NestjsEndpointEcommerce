import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductShipping, Shipping } from 'src/database/entities';
import { CreateShippingParams, UpdateShippingParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
        @InjectRepository(ProductShipping) private productShippingRepository: Repository<ProductShipping>,
    ) {}

    async createShipping(shippingDetails: CreateShippingParams) {
        const newShipping = this.shippingRepository.create({
            ...shippingDetails,
            createdAt : new Date(),
            updatedAt: new Date()
        });

        const savedShipping = await this.shippingRepository.save(newShipping);
        console.log(`Shipping created successfully with ID: ${savedShipping.id}`);
        return savedShipping;
        
    }

    findShipping() {
        
        return this.shippingRepository.find(); 
    }

    findShippingById(id: string) {
        
        return this.shippingRepository.findOne({ where: { id }}); 
    }

    async updateShipping(id: string, updateShippingDetails: UpdateShippingParams) {
                return this.shippingRepository.update(id, { ...updateShippingDetails, updatedAt: new Date() });
    }

    deleteShipping(id: string) {
        
        return this.shippingRepository.delete(id);
    }

}
