import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/database/entities';
import { CreateProductTagParams, UpdateProductTagParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTagService {
    constructor(
        @InjectRepository(ProductTag) private productRepository: Repository<ProductTag>
    ) {}

    async createProductTag(productDetails: CreateProductTagParams) {
        const newProductTag = this.productRepository.create({
            ...productDetails,
        });

        const savedProductTag = await this.productRepository.save(newProductTag);
        console.log(`ProductTag cretaed successfullu with ID: ${savedProductTag.id}`);
        return savedProductTag;
        
    }

    findProductTag() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductTagById(id: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductTag(id: string, updateProductTagDetails: UpdateProductTagParams) {
                return this.productRepository.update(id, { ...updateProductTagDetails });
    }

    deleteProductTag(id: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(id);
    }

}
