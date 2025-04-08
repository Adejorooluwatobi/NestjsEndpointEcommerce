import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VariantAttributeValue } from './variantAttributeValues';

@ObjectType()
@Entity({ name: 'attribute_values' })
export class AttributeValue {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    attribute_id: string;

    @Field()
    @Column({ length: 255 })
    attribute_value: string;

    @Field()
    @Column({ length: 50 })
    color: string;

    @Field(() => [VariantAttributeValue])
    @OneToMany(() => VariantAttributeValue, (variantAttributeValue) => variantAttributeValue.attribute_value)
    variant_attribute_values: VariantAttributeValue[];
}