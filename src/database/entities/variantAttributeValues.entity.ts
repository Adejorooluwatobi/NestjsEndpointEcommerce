import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Variant } from './variants.entity';
import { AttributeValue } from './attributeValues.entity';

@ObjectType()
@Entity({ name: 'variantAttributeValues' })
export class VariantAttributeValue {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    attributeValueId: string;

    @Field()
    @Column('uuid')
    variantId: string;

    @Field(() => Variant)
    @ManyToOne(() => Variant, (variant) => variant.variantAttributeValues)
    variant: Variant;

    @Field(() => AttributeValue)
    @ManyToOne(() => AttributeValue, (attributeValues) => attributeValues.variantAttributeValues)
    attributeValues: AttributeValue;
}