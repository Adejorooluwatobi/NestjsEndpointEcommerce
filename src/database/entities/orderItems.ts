import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './orders';
import { Product } from './products';

@ObjectType()
@Entity({ name: 'order_items' })
export class OrderItem {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    order_id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field()
    @Column('numeric')
    price: number;

    @Field()
    @Column('integer')
    quantity: number;

    @Field(() => Order)
    @ManyToOne(() => Order, (order) => order.orderItems)
    order: Order;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.orderItems)
    product: Product;
}