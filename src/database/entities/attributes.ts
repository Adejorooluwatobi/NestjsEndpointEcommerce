import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductAttribute } from './productAttributes';

@ObjectType()
@Entity({ name: 'attributes' })
export class Attribute {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 255 })
    attribute_name: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @UpdateDateColumn()
    updated_at: Date;

    @Field()
    @Column('uuid')
    created_by: string;

    @Field()
    @Column('uuid')
    updated_by: string;

    @Field(() => [ProductAttribute])
    @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.attribute)
    productAttributes: ProductAttribute[];
}