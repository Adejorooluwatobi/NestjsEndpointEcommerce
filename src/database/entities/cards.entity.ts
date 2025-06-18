import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Customer } from './customers.entity';
import { CardItem } from './cardItems.entity';

@ObjectType()
@Entity({ name: 'cards' })
export class Card {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 32 })
    cardNumber: string;

    @Field()
    @Column('uuid')
    customerId: string;

    @Field(() => Customer)
    @ManyToOne(() => Customer, (customer) => customer.cards)
    customer: Customer;

    @Field(() => [CardItem])
    @OneToMany(() => CardItem, (cardItems) => cardItems.card)
    cardItems: CardItem[];
}
