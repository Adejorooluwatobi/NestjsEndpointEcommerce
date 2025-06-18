import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, ProductCategory } from 'src/database/entities';
import { CreateCategoryParams, UpdateCategoryParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
    ) {}

    async createCategory(categoryDetails: CreateCategoryParams) {
        const newCategory = this.categoryRepository.create({
            ...categoryDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedCategory = await this.categoryRepository.save(newCategory);
        console.log(`Category created successfully with ID: ${savedCategory.id}`);
        return savedCategory;
        
    }

    findCategory() {
        
        return this.categoryRepository.find(); 
    }

    findCategoryById(id: string) {
        
        return this.categoryRepository.findOne({ where: { id }}); 
    }

    async updateCategory(id: string, updateCategoryDetails: UpdateCategoryParams) {
                return this.categoryRepository.update(id, { ...updateCategoryDetails, updatedAt: new Date() });
    }

    deleteCategory(id: string) {
        
        return this.categoryRepository.delete(id);
    }

}
