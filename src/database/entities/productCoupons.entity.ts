import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Product } from './products.entity';
import { Coupon } from './coupons.entity';

@ObjectType()
@Entity({ name: 'product_coupons' })
export class ProductCoupon {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    couponId: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field(() => Coupon)
    @ManyToOne(() => Coupon, (coupon) => coupon.productCoupons)
    coupon: Coupon;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productCoupons)
    product: Product;
}