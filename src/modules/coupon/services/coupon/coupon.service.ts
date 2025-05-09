import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon, ProductCoupon } from 'src/database/entities';
import { CreateCouponParams, UpdateCouponParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
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
        console.log(`Coupon created successfully with ID: ${savedCoupon.id}`);
        return savedCoupon;
        
    }

    findCoupon() {
        // Logic to find all customers
        return this.couponRepository.find({relations: ['productCoupon']}); // Fetch customers with their profiles
    }

    findCouponByCode(code: string) {
        // Logic to find a customer by ID
        return this.couponRepository.findOne({ where: { code }, relations:['productCoupon']}); // Fetch customer with their profile
    }

    async updateCoupon(code: string, updateCouponDetails: UpdateCouponParams) {
        return this.couponRepository.update({ code }, { ...updateCouponDetails, updatedAt: new Date() });
    }

    deleteCoupon(code: string) {
        // Logic to delete an customer by ID
        return this.couponRepository.delete({code});
    }

}
