import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'variantAttributeValues' })
export class VariantValue {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Field()
    @Column('uuid')
    variantId: string;

    @Field()
    @Column('numeric')
    price: number;

    @Field()
    @Column('numeric')
    quantity: number;

}