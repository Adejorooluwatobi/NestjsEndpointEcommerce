import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductShipping } from 'src/database/entities';
import { CreateProductShippingParams, UpdateProductShippingParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductShippingService {
    constructor(
        @InjectRepository(ProductShipping) private productRepository: Repository<ProductShipping>
    ) {}

    async createProductShipping(productDetails: CreateProductShippingParams) {
        const newProductShipping = this.productRepository.create({
            ...productDetails
        });

        const savedProductShipping = await this.productRepository.save(newProductShipping);
        console.log(`ProductShipping cretaed successfullu with ID: ${savedProductShipping.id}`);
        return savedProductShipping;
        
    }

    findProductShipping() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductShippingById(id: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductShipping(id: string, updateProductShippingDetails: UpdateProductShippingParams) {
                return this.productRepository.update(id, { ...updateProductShippingDetails });
    }

    deleteProductShipping(id: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(id);
    }

}
