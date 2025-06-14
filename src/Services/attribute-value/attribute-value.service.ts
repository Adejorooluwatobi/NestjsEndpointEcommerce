import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from 'src/database/entities';
import { CreateAttributeValueParams, UpdateAttributeValueParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeValueService {
    constructor(
        @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>
    ) {}

    async createAttributeValue(attributeValueDetails: CreateAttributeValueParams) {
        const newAttributeValue = this.attributeValueRepository.create({
            ...attributeValueDetails,
        });

        const savedAttributeValue = await this.attributeValueRepository.save(newAttributeValue);
        console.log(`AttributeValue created successfully with ID: ${savedAttributeValue.id}`);
        return savedAttributeValue;
        
    }

    findAttributeValue() {
        
        return this.attributeValueRepository.find(); 
    }

    findAttributeValueById(id: string) {
        
        return this.attributeValueRepository.findOne({ where: { id }}); 
    }

    async updateAttributeValue(id: string, updateAttributeValueDetails: UpdateAttributeValueParams) {
                return this.attributeValueRepository.update(id, { ...updateAttributeValueDetails});
    }

    deleteAttributeValue(id: string) {
        
        return this.attributeValueRepository.delete(id);
    }

}
