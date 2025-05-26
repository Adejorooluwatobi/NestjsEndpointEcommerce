import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductShipping, Shipping } from 'src/database/entities';
import { CreateProductShippingParams, UpdateProductShippingParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductShippingService {
    constructor(
        @InjectRepository(ProductShipping) private productShippingRepository: Repository<ProductShipping>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Shipping) private shippingRepository: Repository<Shipping>,
    ) {}

    async createProductShipping(productDetails: CreateProductShippingParams) {
        const newProductShipping = this.productShippingRepository.create({
            ...productDetails
        });

        const savedProductShipping = await this.productShippingRepository.save(newProductShipping);
        console.log(`ProductShipping created successfully with ID: ${savedProductShipping.id}`);
        return savedProductShipping;
        
    }

    findProductShipping() {
        // Logic to find all customers
        return this.productShippingRepository.find({relations:['product', 'shipping']}); // Fetch customers with their profiles
    }

    findProductShippingById(id: string) {
        // Logic to find a customer by ID
        return this.productShippingRepository.findOne({ where: { id }, relations: ['product', 'shipping']}); // Fetch customer with their profile
    }

    async updateProductShipping(id: string, updateProductShippingDetails: UpdateProductShippingParams) {
                return this.productShippingRepository.update(id, { ...updateProductShippingDetails });
    }

    deleteProductShipping(id: string) {
        // Logic to delete an customer by ID
        return this.productShippingRepository.delete(id);
    }

}
