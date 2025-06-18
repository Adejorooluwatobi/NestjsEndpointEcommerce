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
        
        return this.productCategoryRepository.find({relations:['product', 'category']}); 
    }

    findProductCategoryById(id: string) {
        
        return this.productCategoryRepository.findOne({ where: { id }, relations:['product', 'category']}); 
    }

    async updateProductCategory(id: string, updateProductCategoryDetails: UpdateProductCategoryParams) {
                return this.productCategoryRepository.update(id, { ...updateProductCategoryDetails });
    }

    deleteProductCategory(id: string) {
        
        return this.productCategoryRepository.delete(id);
    }

}
