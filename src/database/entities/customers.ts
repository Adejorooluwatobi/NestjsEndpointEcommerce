import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Order } from './orders';
import { Card } from './cards';

@ObjectType()
@Entity({ name: 'customers' })
export class Customer {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    first_name: string;

    @Field()
    @Column({ length: 100 })
    last_name: string;

    @Field()
    @Column({ length: 255 })
    phone_number: string;

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
    registered_at: Date;

    @Field()
    @Column('timestamp')
    created_at: Date;

    @Field()
    @Column('timestamp')
    updated_at: Date;

    @Field()
    @Column('uuid')
    created_by: string;

    @Field()
    @Column('uuid')
    updated_by: string;

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @Field(() => [Card])
    @OneToMany(() => Card, (card) => card.customer)
    cards: Card[];
}
