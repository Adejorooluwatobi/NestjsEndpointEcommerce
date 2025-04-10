import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Card } from './cards.entity';
// import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'card_items' })
export class CardItem {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    cardId: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('smallint')
    quantity: number;

    @Field(() => Card)
    @ManyToOne(() => Card, (card) => card.cardItems)
    card: Card;

    // @Field(() => Product)
    // @ManyToOne(() => Product, (product) => product.cardItems)
    // product: Product;
}
