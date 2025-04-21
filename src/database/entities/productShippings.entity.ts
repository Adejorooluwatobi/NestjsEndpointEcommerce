import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';
import { Shipping } from './shippings.entity';


@ObjectType()
@Entity({ name: 'product_shippings' })
export class ProductShipping {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('uuid')
    shippingId: string;

    // @Field()
    // @Column('integer')
    // shippingIdInteger: number;

    @Field()
    @Column('numeric')
    shipCharge: number;

    @Field()
    @Column('boolean')
    free: boolean;

    @ManyToOne(() => Product, (product) => product.productShippings)
    product: Product;

    @ManyToOne(() => Shipping, (shipping) => shipping.productShippings)
    shipping: Shipping;

    @Field()
    @Column('numeric')
    estimatedDays: number;

}