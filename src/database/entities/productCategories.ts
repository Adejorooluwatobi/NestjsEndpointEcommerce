import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './categories';
import { Product } from './products';

@ObjectType()
@Entity({ name: 'product_categories' })
export class ProductCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    category_id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field(() => Category)
    @ManyToOne(() => Category, (category) => category.productCategory)
    category: Category;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productCategory)
    product: Product;
}