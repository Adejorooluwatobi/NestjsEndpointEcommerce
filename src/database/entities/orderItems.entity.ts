import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'order_items' })
export class OrderItem {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    orderId: string;

    @Field()
    @Column('uuid')
    productId: string;

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