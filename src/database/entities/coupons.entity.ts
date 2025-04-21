import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
// import { ProductCoupon } from './productCoupons.entity';
import { Order } from './orders.entity';
import { ProductCoupon } from './productCoupons.entity';

@ObjectType()
@Entity({ name: 'coupons' })
export class Coupon {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 50 })
    code: string;

    @Field()
    @Column('text')
    couponDescription: string;

    @Field()
    @Column('numeric')
    discountValue: number;

    @Field()
    @Column({ length: 50, default: 'percentage' })
    discountType: string;

    @Field()
    @Column('integer', { default: 0 })
    timesUsed: number;

    @Field()
    @Column('integer')
    maxUsage: number;

    @Field()
    @Column('timestamp')
    couponStartDate: Date;

    @Field()
    @Column('timestamp')
    couponEndDate: Date;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid', { nullable: true }) // Track who created the coupon
    createdBy: string;

    @Field()
    @Column('uuid', { nullable: true }) // Track who last updated the coupon
    updatedBy: string;

    @Field(() => [ProductCoupon])
    @OneToMany(() => ProductCoupon, (productCoupons) => productCoupons.coupon)
    productCoupons: ProductCoupon[];

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.coupon)
    orders: Order[];

    @BeforeInsert()
    @BeforeUpdate()
    validateDates() {
        if (this.couponEndDate <= this.couponStartDate) {
            throw new Error('couponEndDate must be after couponStartDate');
        }
    }
}