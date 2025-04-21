import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute, Product, ProductAttribute } from 'src/database/entities';
import { CreateProductAttributeParams, UpdateProductAttributeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeService {
    constructor(
        @InjectRepository(ProductAttribute) private productAttributeRepository: Repository<ProductAttribute>,
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async createProductAttribute(productDetails: CreateProductAttributeParams) {
        const newProductAttribute = this.productAttributeRepository.create({
            ...productDetails,
        });

        const savedProductAttribute = await this.productAttributeRepository.save(newProductAttribute);
        console.log(`ProductAttribute cretaed successfullu with ID: ${savedProductAttribute.id}`);
        return savedProductAttribute;
        
    }

    findProductAttribute() {
        // Logic to find all customers
        return this.productAttributeRepository.find(); // Fetch customers with their profiles
    }

    findProductAttributeById(id: string) {
        // Logic to find a customer by ID
        return this.productAttributeRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductAttribute(id: string, updateProductAttributeDetails: UpdateProductAttributeParams) {
                return this.productAttributeRepository.update(id, { ...updateProductAttributeDetails });
    }

    deleteProductAttribute(id: string) {
        // Logic to delete an customer by ID
        return this.productAttributeRepository.delete(id);
    }

}
