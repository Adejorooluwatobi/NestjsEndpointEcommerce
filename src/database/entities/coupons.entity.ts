import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
// import { ProductCoupon } from './productCoupons.entity';
import { Order } from './orders.entity';

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
    @Column({ length: 50 })
    discountType: string;

    @Field()
    @Column('boolean')
    timesUsed: boolean;

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
    @Column('uuid')
    createdBy: string;

    @Field()
    @Column('uuid')
    updatedBy: string;

    // @Field(() => [ProductCoupon])
    // @OneToMany(() => ProductCoupon, (productCoupons) => productCoupons.coupon)
    // productCoupons: ProductCoupon[];

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.coupon)
    orders: Order[];
}