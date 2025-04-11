import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductShipping } from './productShippings.entity';

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
    isActive: boolean;;

    @Field()
    @Column('text')
    iconPath: string;

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

    @Field(() => [ProductShipping])
    @OneToMany(() => ProductShipping, (productShippings) => productShippings.shipping)
    productShippings: ProductShipping[];
}