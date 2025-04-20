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
        console.log(`AttributeValue cretaed successfullu with ID: ${savedAttributeValue.id}`);
        return savedAttributeValue;
        
    }

    findAttributeValue() {
        // Logic to find all customers
        return this.attributeValueRepository.find(); // Fetch customers with their profiles
    }

    findAttributeValueById(id: string) {
        // Logic to find a customer by ID
        return this.attributeValueRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateAttributeValue(id: string, updateAttributeValueDetails: UpdateAttributeValueParams) {
                return this.attributeValueRepository.update(id, { ...updateAttributeValueDetails});
    }

    deleteAttributeValue(id: string) {
        // Logic to delete an customer by ID
        return this.attributeValueRepository.delete(id);
    }

}
