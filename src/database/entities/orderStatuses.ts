import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './orders';

@ObjectType()
@Entity({ name: 'order_statuses' })
export class OrderStatus {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ length: 50 })
    status_name: string;

    @Field()
    @Column({ length: 50 })
    color: string;

    @Field()
    @Column({ length: 50 })
    privacy: string;

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

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.orderStatus)
    orders: Order[];
}
