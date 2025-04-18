import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttribute } from 'src/database/entities';
import { CreateProductAttributeParams, UpdateProductAttributeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeService {
    constructor(
        @InjectRepository(ProductAttribute) private productRepository: Repository<ProductAttribute>
    ) {}

    async createProductAttribute(productDetails: CreateProductAttributeParams) {
        const newProductAttribute = this.productRepository.create({
            ...productDetails,
        });

        const savedProductAttribute = await this.productRepository.save(newProductAttribute);
        console.log(`ProductAttribute cretaed successfullu with ID: ${savedProductAttribute.id}`);
        return savedProductAttribute;
        
    }

    findProductAttribute() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductAttributeById(id: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductAttribute(id: string, updateProductAttributeDetails: UpdateProductAttributeParams) {
                return this.productRepository.update(id, { ...updateProductAttributeDetails });
    }

    deleteProductAttribute(id: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(id);
    }

}
