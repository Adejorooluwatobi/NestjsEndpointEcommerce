import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute, AttributeValue, Product, ProductAttribute } from 'src/database/entities';
import { CreateProductAttributeParams, UpdateProductAttributeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductAttributeService {
    constructor(
        @InjectRepository(ProductAttribute) private productAttributeRepository: Repository<ProductAttribute>,
        @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
        @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async createProductAttribute(productDetails: CreateProductAttributeParams) {
        const newProductAttribute = this.productAttributeRepository.create({
            ...productDetails,
        });

        const savedProductAttribute = await this.productAttributeRepository.save(newProductAttribute);
        console.log(`ProductAttribute created successfully with ID: ${savedProductAttribute.id}`);
        return savedProductAttribute;
        
    }

    findProductAttribute() {
        
        return this.productAttributeRepository.find({relations: ['product', 'attribute', 'attributeValue']}); 
    }

    findProductAttributeById(id: string) {
        
        return this.productAttributeRepository.findOne({ where: { id }, relations: ['product', 'attribute', 'attributeValue'] }); 
    }

    async updateProductAttribute(id: string, updateProductAttributeDetails: UpdateProductAttributeParams) {
                return this.productAttributeRepository.update(id, { ...updateProductAttributeDetails });
    }

    deleteProductAttribute(id: string) {
        
        return this.productAttributeRepository.delete(id);
    }

}
