import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { VariantAttributeValue } from './variantAttributeValues.entity';
import { Attribute } from './attributes.entity';
import { ProductAttribute } from './productAttributes.entity';

@ObjectType()
@Entity({ name: 'attributeValues' })
export class AttributeValue {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    attributeId: string;

    @Field()
    @Column({ length: 255 })
    attributeValue: string;

    @Field()
    @Column({ length: 50 })
    color: string;

    @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues)
    attribute: Attribute;

    @Field(() => [ProductAttribute])
    @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.attributeValue)
    productAttributes: ProductAttribute[];

    @Field(() => [VariantAttributeValue])
    @OneToMany(() => VariantAttributeValue, (variantAttributeValues) => variantAttributeValues.attributeValues)
    variantAttributeValues: VariantAttributeValue[];
}