import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tag } from './tags.entity';
import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'product_tags' })
export class ProductTag {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field(() => Tag)
    @ManyToOne(() => Tag, (tag) => tag.productTags)
    tag: Tag;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productTags)
    product: Product;
}