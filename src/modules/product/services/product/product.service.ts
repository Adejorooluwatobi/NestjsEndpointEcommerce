import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery, Product } from 'src/database/entities';
import { CreateProductParams, UpdateProductParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Gallery) private galleryRepository: Repository<Gallery>,
    ) {}

    async createProduct(productDetails: CreateProductParams) {
        const newProduct = this.productRepository.create({
            ...productDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedProduct = await this.productRepository.save(newProduct);
        console.log(`Product cretaed successfullu with ID: ${savedProduct.id}`);
        return savedProduct;
        
    }

    findProduct() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductByCode(productCode: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { productCode }}); // Fetch customer with their profile
    }

    async updateProduct(productCode: string, updateProductDetails: UpdateProductParams) {
                return this.productRepository.update(productCode, { ...updateProductDetails, updatedAt: new Date() });
    }

    deleteProduct(productCode: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(productCode);
    }

}
