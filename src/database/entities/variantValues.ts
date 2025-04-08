import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'variant_attribute_values' })
export class VariantAttributeValue {
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
    @Column('numeric')
    quantity: number;

}