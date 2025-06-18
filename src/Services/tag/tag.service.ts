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
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedTag = await this.tagRepository.save(newTag);
        console.log(`Tag created successfully with ID: ${savedTag.id}`);
        return savedTag;
        
    }

    findTag() {
        
        return this.tagRepository.find(); 
    }

    findTagById(id: string) {
        
        return this.tagRepository.findOne({ where: { id }}); 
    }

    async updateTag(id: string, updateTagDetails: UpdateTagParams) {
                return this.tagRepository.update(id, { ...updateTagDetails, updatedAt: new Date() });
    }

    deleteTag(id: string) {
        
        return this.tagRepository.delete(id);
    }

}
