import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customers.entity';
import { Coupon } from './coupons.entity';
import { OrderItem } from './orderItems.entity';
import { OrderStatus } from './orderStatuses.entity';
import { Payment } from './payment.entity';

@ObjectType()
@Entity({ name: 'orders' })
export class Order {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    orderNo: string;

    @Field()
    @Column('uuid')
    customerId: string;

    @Field()
    @Column('uuid', { nullable: true })
    couponId: string;

    @Field()
    @Column('integer')
    orderStatusId: number;

    @Field()
    @Column('timestamp')
    orderDeliveredCarrierDate: Date;

    @Field()
    @Column('timestamp')
    orderDeliveredCustomerDate: Date;

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

    @Field(() => [Payment])
    @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[];
}
