import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products';
import { Coupon } from './coupons';

@ObjectType()
@Entity({ name: 'product_coupons' })
export class ProductCoupon {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    coupon_id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field(() => Coupon)
    @ManyToOne(() => Coupon, (coupon) => coupon.productCoupons)
    coupon: Coupon;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productCoupons)
    product: Product;
}