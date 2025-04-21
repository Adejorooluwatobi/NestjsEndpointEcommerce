import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
// import { Product } from './products.entity';
import { VariantAttributeValue } from './variantAttributeValues.entity';
import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'variants' })
export class Variant {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('numeric')
    price: number;

    @Field()
    @Column('integer')
    quantity: number;

    @Field()
    @Column('uuid')
    productId: string;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.variants)
    product: Product;

    @Field(() => [VariantAttributeValue])
    @OneToMany(() => VariantAttributeValue, (variantAttributeValues) => variantAttributeValues.variant)
    variantAttributeValues: VariantAttributeValue[];
}
