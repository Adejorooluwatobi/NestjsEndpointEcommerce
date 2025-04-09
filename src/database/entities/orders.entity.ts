import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customers.entity';
import { Coupon } from './coupons.entity';
import { OrderItem } from './orderItems.entity';
import { OrderStatus } from './orderStatuses.entity';

@ObjectType()
@Entity({ name: 'orders' })
export class Order {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    order_no: string;

    @Field()
    @Column('uuid')
    customer_id: string;

    @Field()
    @Column('uuid')
    coupon_id: string;

    @Field()
    @Column('integer')
    order_status_id: number;

    @Field()
    @Column('timestamp')
    order_delivered_carrier_date: Date;

    @Field()
    @Column('timestamp')
    order_delivered_customer_date: Date;

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

    @Field(() => Customer)
    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @Field(() => Coupon)
    @ManyToOne(() => Coupon, (coupon) => coupon.orders)
    coupon: Coupon;

    @Field(() => [OrderItem])
    @OneToMany(() => OrderItem, (orderItems) => orderItems.order)
    orderItems: OrderItem[];

    @Field(() => OrderStatus)
    @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
    orderStatus: OrderStatus;
}
