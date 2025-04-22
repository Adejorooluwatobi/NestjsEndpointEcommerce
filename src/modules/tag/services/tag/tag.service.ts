import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag, Tag } from 'src/database/entities';
import { CreateTagParams, UpdateTagParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(ProductTag) private productTagRepository: Repository<ProductTag>,
    ) {}

    async createTag(tagDetails: CreateTagParams) {
        const newTag = this.tagRepository.create({
            ...tagDetails,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const savedTag = await this.tagRepository.save(newTag);
        console.log(`Tag created successfully with ID: ${savedTag.id}`);
        return savedTag;
        
    }

    findTag() {
        // Logic to find all customers
        return this.tagRepository.find(); // Fetch customers with their profiles
    }

    findTagById(id: string) {
        // Logic to find a customer by ID
        return this.tagRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateTag(id: string, updateTagDetails: UpdateTagParams) {
                return this.tagRepository.update(id, { ...updateTagDetails, updatedAt: Date.now() });
    }

    deleteTag(id: string) {
        // Logic to delete an customer by ID
        return this.tagRepository.delete(id);
    }

}
