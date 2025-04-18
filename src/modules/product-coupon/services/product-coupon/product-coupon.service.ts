import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCoupon } from 'src/database/entities';
import { CreateProductCouponParams, UpdateProductCouponParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCouponService {
    constructor(
        @InjectRepository(ProductCoupon) private productRepository: Repository<ProductCoupon>
    ) {}

    async createProductCoupon(productDetails: CreateProductCouponParams) {
        const newProductCoupon = this.productRepository.create({
            ...productDetails,
        });

        const savedProductCoupon = await this.productRepository.save(newProductCoupon);
        console.log(`ProductCoupon cretaed successfullu with ID: ${savedProductCoupon.id}`);
        return savedProductCoupon;
        
    }

    findProductCoupon() {
        // Logic to find all customers
        return this.productRepository.find(); // Fetch customers with their profiles
    }

    findProductCouponById(id: string) {
        // Logic to find a customer by ID
        return this.productRepository.findOne({ where: { id }}); // Fetch customer with their profile
    }

    async updateProductCoupon(id: string, updateProductCouponDetails: UpdateProductCouponParams) {
                return this.productRepository.update(id, { ...updateProductCouponDetails });
    }

    deleteProductCoupon(id: string) {
        // Logic to delete an customer by ID
        return this.productRepository.delete(id);
    }

}
