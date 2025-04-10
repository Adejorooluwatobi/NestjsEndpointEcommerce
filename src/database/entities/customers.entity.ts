import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from './orders.entity';
import { Card } from './cards.entity';

@ObjectType()
@Entity({ name: 'customers' })
export class Customer {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    firstName: string;

    @Field()
    @Column({ length: 100 })
    lastName: string;

    @Field()
    @Column({ length: 255 })
    phoneNumber: string;

    @Field()
    @Column({ length: 255 })
    email: string;

    @Field()
    @Column('text')
    password: string;

    @Field()
    @Column('boolean')
    active: boolean;

    @Field()
    @CreateDateColumn()
    registeredAt: Date;

    @Field()
    @Column('timestamp')
    createdAt: Date;

    @Field()
    @Column('timestamp')
    updatedAt: Date;

    @Field()
    @Column('uuid')
    createdBy: string;

    @Field()
    @Column('uuid')
    updatedBy: string;

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @Field(() => [Card])
    @OneToMany(() => Card, (card) => card.customer)
    cards: Card[];
}
