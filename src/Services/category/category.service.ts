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

    async createCategory(categoryDetails: CreateCategoryParams & { image: string }) {
        const { image: _image, ...rest } = categoryDetails;
        const newCategory = this.categoryRepository.create({
            ...rest,
            image: _image, 
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

    async updateCategory(id: string, updateCategoryDetails: UpdateCategoryParams & { image?: string }) {
        const { image, ...rest } = updateCategoryDetails;
        const existingCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!existingCategory) {
            throw new Error(`Category with ID ${id} not found`);
        }
        const updatedData: Partial<Category> = { ...rest, updatedAt: new Date() };
        if (image) {
            updatedData.image = image;
        }
                const category = await this.categoryRepository.update(id, { ...updatedData, updatedAt: new Date() });
                return category;

    }

    async deleteCategory(id: string) {
        const banner = await this.categoryRepository.findOne({ where: { id } });
        if (!banner) throw new Error(`Category with ID ${id} not found`);
        return this.categoryRepository.delete(id);
    }

}
