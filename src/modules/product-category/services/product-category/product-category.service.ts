import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/database/entities';
import { CreateProductCategoryParams, UpdateProductCategoryParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory) private productRepository: Repository<ProductCategory>
    ) {}

    async createProductCategory(productDetails: CreateProductCategoryParams) {
        const newProductCategory = this.productRepository.create({
            ...productDetails,
        });

        const savedProductCategory = await this.productRepository.save(newProductCategory);
        console.log(`ProductCategory cretaed successfullu with ID: ${savedProductCategory.id}`);
        return savedProductCategory;
        
    }

    findProductCategory() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductCategoryById(id: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductCategory(id: string, updateProductCategoryDetails: UpdateProductCategoryParams) {
                return this.productRepository.update(id, { ...updateProductCategoryDetails });
    }

    deleteProductCategory(id: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(id);
    }

}
