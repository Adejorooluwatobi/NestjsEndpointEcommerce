import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Variant } from './variants';
import { AttributeValue } from './attributeValues';

@ObjectType()
@Entity({ name: 'variant_attribute_values' })
export class VariantAttributeValue {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    variant_attribute_value_id: string;

    @Field()
    @Column('uuid')
    variant_value_id: string;

    @Field(() => Variant)
    @ManyToOne(() => Variant, (variant) => variant.variantAttributeValues)
    variant: Variant;

    @Field(() => AttributeValue)
    @ManyToOne(() => AttributeValue, (attributeValues) => attributeValues.variantAttributeValues)
    attributeValues: AttributeValue;
}