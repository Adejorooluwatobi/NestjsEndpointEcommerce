import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductShipping } from './productShippings';

@ObjectType()
@Entity({ name: 'shippings' })
export class Shipping {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('text')
    name: string;

    @Field()
    @Column('boolean')
    active: boolean;

    @Field()
    @Column('text')
    icon_path: string;

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

    @Field(() => [ProductShipping])
    @OneToMany(() => ProductShipping, (productShipping) => productShipping.shipping)
    product_shippings: ProductShipping[];
}