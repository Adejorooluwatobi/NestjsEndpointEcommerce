import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Product, ProductCategory } from 'src/database/entities';
import { CreateProductCategoryParams, UpdateProductCategoryParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) {}

    async createProductCategory(productDetails: CreateProductCategoryParams) {
        const newProductCategory = this.productCategoryRepository.create({
            ...productDetails,
        });

        const savedProductCategory = await this.productCategoryRepository.save(newProductCategory);
        console.log(`ProductCategory created successfully with ID: ${savedProductCategory.id}`);
        return savedProductCategory;
        
    }

    findProductCategory() {
        // Logic to find all customers
        return this.productCategoryRepository.find({relations:['product', 'category']}); // Fetch customers with their profiles
    }

    findProductCategoryById(id: string) {
        // Logic to find a customer by ID
        return this.productCategoryRepository.findOne({ where: { id }, relations:['product', 'category']}); // Fetch customer with their profile
    }

    async updateProductCategory(id: string, updateProductCategoryDetails: UpdateProductCategoryParams) {
                return this.productCategoryRepository.update(id, { ...updateProductCategoryDetails });
    }

    deleteProductCategory(id: string) {
        // Logic to delete an customer by ID
        return this.productCategoryRepository.delete(id);
    }

}
