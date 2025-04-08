import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Card } from './cards';
import { Product } from './products';

@ObjectType()
@Entity({ name: 'card_items' })
export class CardItem {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    card_id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field()
    @Column('smallint')
    quantity: number;

    @Field(() => Card)
    @ManyToOne(() => Card, (card) => card.card_items)
    card: Card;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.card_items)
    product: Product;
}
