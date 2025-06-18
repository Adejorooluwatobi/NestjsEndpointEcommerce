import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductAttribute } from './productAttributes.entity';
import { AttributeValue } from './attributeValues.entity';

@ObjectType()
@Entity({ name: 'attributes' })
export class Attribute {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 255 })
    attributeName: string;

    @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
    attributeValues: AttributeValue[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid', { nullable: true }) // Track who created the coupon
    createdBy: string;

    @Field()
    @Column('uuid', { nullable: true }) // Track who last updated the coupon
    updatedBy: string;

    @Field(() => [ProductAttribute])
    @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.attributeValue)
    productAttributes: ProductAttribute[];
}