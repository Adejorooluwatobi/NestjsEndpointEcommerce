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

    @ManyToOne(() => Product, (product) => product.productShippings)
    product: Product;

    @ManyToOne(() => Shipping, (shipping) => shipping.productShippings)
    shipping: Shipping;

    @Field()
    @Column('numeric')
    estimated_days: number;

}