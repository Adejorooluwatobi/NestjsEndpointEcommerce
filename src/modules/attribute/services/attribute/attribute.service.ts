import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute, ProductAttribute } from 'src/database/entities';
import { CreateAttributeParams, UpdateAttributeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(ProductAttribute) private productRepository: Repository<ProductAttribute>
    ) {}

    async createAttribute(attributeDetails: CreateAttributeParams) {
        const newAttribute = this.attributeRepository.create({
            ...attributeDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedAttribute = await this.attributeRepository.save(newAttribute);
        console.log(`Attribute cretaed successfullu with ID: ${savedAttribute.id}`);
        return savedAttribute;
        
    }

    findAttribute() {
        // Logic to find all customers
        return this.attributeRepository.find(); // Fetch customers with their profiles
    }

    findAttributeById(id: string) {
        // Logic to find a customer by ID
        return this.attributeRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateAttribute(id: string, updateAttributeDetails: UpdateAttributeParams) {
                return this.attributeRepository.update(id, { ...updateAttributeDetails, updatedAt: new Date() });
    }

    deleteAttribute(id: string) {
        // Logic to delete an customer by ID
        return this.attributeRepository.delete(id);
    }

}
