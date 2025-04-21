import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon, Product, ProductCoupon } from 'src/database/entities';
import { CreateProductCouponParams, UpdateProductCouponParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCouponService {
    constructor(
        @InjectRepository(ProductCoupon) private productCouponRepository: Repository<ProductCoupon>,
        @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) {}

    async createProductCoupon(productDetails: CreateProductCouponParams) {
        const newProductCoupon = this.productCouponRepository.create({
            ...productDetails,
        });

        const savedProductCoupon = await this.productCouponRepository.save(newProductCoupon);
        console.log(`ProductCoupon cretaed successfullu with ID: ${savedProductCoupon.id}`);
        return savedProductCoupon;
        
    }

    findProductCoupon() {
        // Logic to find all customers
        return this.productCouponRepository.find({relations:['coupon', 'product']}); // Fetch customers with their profiles
    }

    findProductCouponById(id: string) {
        // Logic to find a customer by ID
        return this.productCouponRepository.findOne({ where: { id }, relations: ['coupon', 'product']}); // Fetch customer with their profile
    }

    async updateProductCoupon(id: string, updateProductCouponDetails: UpdateProductCouponParams) {
                return this.productCouponRepository.update(id, { ...updateProductCouponDetails });
    }

    deleteProductCoupon(id: string) {
        // Logic to delete an customer by ID
        return this.productCouponRepository.delete(id);
    }

}
