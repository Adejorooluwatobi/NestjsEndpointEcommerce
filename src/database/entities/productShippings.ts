import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products';
import { Shipping } from './shippings';


@ObjectType()
@Entity({ name: 'product_shippings' })
export class ProductShipping {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field()
    @Column('uuid')
    shipping_id: string;

    @Field()
    @Column('integer')
    shipping_id_integer: number;

    @Field()
    @Column('numeric')
    ship_charge: number;

    @Field()
    @Column('boolean')
    free: boolean;

    @ManyToOne(() => Product, (product) => product.product_shippings)
    product: Product;

    @ManyToOne(() => Shipping, (shipping) => shipping.product_shippings)
    shipping: Shipping;

    @Field()
    @Column('numeric')
    estimated_days: number;

}