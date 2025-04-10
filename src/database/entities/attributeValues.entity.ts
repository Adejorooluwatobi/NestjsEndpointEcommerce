import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { VariantAttributeValue } from './variantAttributeValues.entity';

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

    @Field(() => [VariantAttributeValue])
    @OneToMany(() => VariantAttributeValue, (variantAttributeValues) => variantAttributeValues.attributeValues)
    variantAttributeValues: VariantAttributeValue[];
}