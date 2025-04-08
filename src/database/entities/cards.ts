import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customers';
import { CardItem } from './cardItems';

@ObjectType()
@Entity({ name: 'cards' })
export class Card {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    customer_id: string;

    @Field(() => Customer)
    @ManyToOne(() => Customer, (customer) => customer.cards)
    customer: Customer;

    @Field(() => [CardItem])
    @OneToMany(() => CardItem, (cardItem) => cardItem.card)
    card_items: CardItem[];
}
