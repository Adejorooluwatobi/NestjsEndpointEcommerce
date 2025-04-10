import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductAttribute } from './productAttributes.entity';

@ObjectType()
@Entity({ name: 'attributes' })
export class Attribute {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 255 })
    attributeName: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid')
    createdBy: string;

    @Field()
    @Column('uuid')
    updatedBy: string;

    @Field(() => [ProductAttribute])
    @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.attribute)
    productAttributes: ProductAttribute[];
}