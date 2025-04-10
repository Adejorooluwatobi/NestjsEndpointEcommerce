import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@ObjectType()
@Entity({ name: 'product_shippings' })
export class Sells {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('numeric')
    price: number;

    @Field()
    @Column('numeric')
    quantity: number;

}