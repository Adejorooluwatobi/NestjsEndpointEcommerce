import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from './products';
import { VariantAttributeValue } from './variantAttributeValues';

@ObjectType()
@Entity({ name: 'variants' })
export class Variant {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    variant_id: string;

    @Field()
    @Column('numeric')
    price: number;

    @Field()
    @Column('integer')
    quantity: number;

    @Field()
    @Column('uuid')
    variant_attribute_value_id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;

    @Field(() => [VariantAttributeValue])
    @OneToMany(() => VariantAttributeValue, (variantAttributeValue) => variantAttributeValue.variant)
    variant_attribute_values: VariantAttributeValue[];
}
