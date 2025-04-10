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
    coupon_description: string;

    @Field()
    @Column('numeric')
    discount_value: number;

    @Field()
    @Column({ length: 50 })
    discount_type: string;

    @Field()
    @Column('boolean')
    times_used: boolean;

    @Field()
    @Column('integer')
    max_usage: number;

    @Field()
    @Column('timestamp')
    coupon_start_date: Date;

    @Field()
    @Column('timestamp')
    coupon_end_date: Date;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @UpdateDateColumn()
    updated_at: Date;

    @Field()
    @Column('uuid')
    created_by: string;

    @Field()
    @Column('uuid')
    updated_by: string;

    // @Field(() => [ProductCoupon])
    // @OneToMany(() => ProductCoupon, (productCoupons) => productCoupons.coupon)
    // productCoupons: ProductCoupon[];

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.coupon)
    orders: Order[];
}