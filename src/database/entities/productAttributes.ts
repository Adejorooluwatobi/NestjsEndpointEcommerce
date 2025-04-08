import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products';
import { Attribute } from './attributes';


@ObjectType()
@Entity({ name: 'product_attributes' })
export class ProductAttribute {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field()
    @Column('uuid')
    attribute_id: string;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productAttributes)
    product: Product;

    @Field(() => Attribute)
    @ManyToOne(() => Attribute, (attribute) => attribute.productAttributes)
    attribute: Attribute;
}