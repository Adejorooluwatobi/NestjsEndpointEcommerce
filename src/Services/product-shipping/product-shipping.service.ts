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
        
        return this.productShippingRepository.find({relations:['product', 'shipping']}); 
    }

    findProductShippingById(id: string) {
        
        return this.productShippingRepository.findOne({ where: { id }, relations: ['product', 'shipping']}); 
    }

    async updateProductShipping(id: string, updateProductShippingDetails: UpdateProductShippingParams) {
                return this.productShippingRepository.update(id, { ...updateProductShippingDetails });
    }

    deleteProductShipping(id: string) {
        
        return this.productShippingRepository.delete(id);
    }

}
