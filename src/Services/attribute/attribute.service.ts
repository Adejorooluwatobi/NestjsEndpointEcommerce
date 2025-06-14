import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute, AttributeValue, ProductAttribute } from 'src/database/entities';
import { CreateAttributeParams, UpdateAttributeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(ProductAttribute) private productRepository: Repository<ProductAttribute>,
        @InjectRepository(AttributeValue) private AttributeValueRepository: Repository<AttributeValue>
    ) {}

    async createAttribute(attributeDetails: CreateAttributeParams) {
        const newAttribute = this.attributeRepository.create({
            ...attributeDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedAttribute = await this.attributeRepository.save(newAttribute);
        console.log(`Attribute created successfully with ID: ${savedAttribute.id}`);
        return savedAttribute;
        
    }

    findAttribute() {
        
        return this.attributeRepository.find({ relations: ['attributeValues'] }); 
    }

    findAttributeById(id: string) {
        
        return this.attributeRepository.findOne({ where: { id }, relations: ['attributeValues'] }); 
    }

    async updateAttribute(id: string, updateAttributeDetails: UpdateAttributeParams) {
                return this.attributeRepository.update(id, { ...updateAttributeDetails, updatedAt: new Date() });
    }

    deleteAttribute(id: string) {
        
        return this.attributeRepository.delete(id);
    }

}
