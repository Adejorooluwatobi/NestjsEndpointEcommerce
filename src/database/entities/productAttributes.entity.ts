import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Product } from './products.entity';
import { Attribute } from './attributes.entity';


@ObjectType()
@Entity({ name: 'productAttributes' })
export class ProductAttribute {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('uuid')
    attributeId: string;

    // @Field(() => Product)
    // @ManyToOne(() => Product, (product) => product.productAttributes)
    // product: Product;

    @Field(() => Attribute)
    @ManyToOne(() => Attribute, (attribute) => attribute.productAttributes)
    attribute: Attribute;
}