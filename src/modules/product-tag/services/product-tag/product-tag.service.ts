import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductTag, Tag } from 'src/database/entities';
import { CreateProductTagParams, UpdateProductTagParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTagService {
    constructor(
        @InjectRepository(ProductTag) private productTagRepository: Repository<ProductTag>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    ) {}

    async createProductTag(productDetails: CreateProductTagParams) {
        const newProductTag = this.productTagRepository.create({
            ...productDetails,
        });

        const savedProductTag = await this.productTagRepository.save(newProductTag);
        console.log(`ProductTag created successfully with ID: ${savedProductTag.id}`);
        return savedProductTag;
        
    }

    findProductTag() {
        // Logic to find all customers
        return this.productTagRepository.find(); // Fetch customers with their profiles
    }

    findProductTagById(id: string) {
        // Logic to find a customer by ID
        return this.productTagRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductTag(id: string, updateProductTagDetails: UpdateProductTagParams) {
                return this.productTagRepository.update(id, { ...updateProductTagDetails });
    }

    deleteProductTag(id: string) {
        // Logic to delete an customer by ID
        return this.productTagRepository.delete(id);
    }

}
