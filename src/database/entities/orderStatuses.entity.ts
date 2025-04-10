import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './orders.entity';

@ObjectType()
@Entity({ name: 'order_statuses' })
export class OrderStatus {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ length: 50 })
    statusName: string;

    @Field()
    @Column({ length: 50 })
    color: string;

    @Field()
    @Column({ length: 50 })
    privacy: string;

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

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.orderStatus)
    orders: Order[];
}
