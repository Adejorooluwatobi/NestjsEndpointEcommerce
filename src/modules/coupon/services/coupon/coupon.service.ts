import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon, Order, ProductCoupon } from 'src/database/entities';
import { CreateCouponParams, UpdateCouponParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(ProductCoupon) private productCouponRepository: Repository<ProductCoupon>
    ) {}

    async createCoupon(couponDetails: CreateCouponParams) {
        if (!couponDetails.code) {
                throw new Error('code is required');
            }
                const existingCoupon = await this.couponRepository.findOneBy({ code: couponDetails.code });
            if (existingCoupon) {
                throw new ConflictException(`Coupon with code ${couponDetails.code} already exists`);
            }
        const newCoupon = this.couponRepository.create({
            ...couponDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const savedCoupon = await this.couponRepository.save(newCoupon);
        console.log(`Coupon cretaed successfullu with ID: ${savedCoupon.id}`);
        return savedCoupon;
        
    }

    findCoupon() {
        // Logic to find all customers
        return this.couponRepository.find(); // Fetch customers with their profiles
    }

    findCouponByCode(code: string) {
        // Logic to find a customer by ID
        return this.couponRepository.findOne({ where: { code }}); // Fetch customer with their profile
    }

    async updateCoupon(code: string, updateCouponDetails: UpdateCouponParams) {
        return this.couponRepository.update({ code }, { ...updateCouponDetails, updatedAt: new Date() });
    }

    deleteCoupon(code: string) {
        // Logic to delete an customer by ID
        return this.couponRepository.delete({code});
    }

}
