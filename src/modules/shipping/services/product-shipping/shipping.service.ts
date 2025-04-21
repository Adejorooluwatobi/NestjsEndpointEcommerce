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
            createdAt : Date.now(),
            updatedAt: Date.now()
        });

        const savedShipping = await this.shippingRepository.save(newShipping);
        console.log(`Shipping cretaed successfullu with ID: ${savedShipping.id}`);
        return savedShipping;
        
    }

    findShipping() {
        // Logic to find all customers
        return this.shippingRepository.find(); // Fetch customers with their profiles
    }

    findShippingById(id: string) {
        // Logic to find a customer by ID
        return this.shippingRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateShipping(id: string, updateShippingDetails: UpdateShippingParams) {
                return this.shippingRepository.update(id, { ...updateShippingDetails, updatedAt: Date.now() });
    }

    deleteShipping(id: string) {
        // Logic to delete an customer by ID
        return this.shippingRepository.delete(id);
    }

}
