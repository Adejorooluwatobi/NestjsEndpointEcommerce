import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './categories.entity';
import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'product_categories' })
export class ProductCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    categoryId: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field(() => Category)
    @ManyToOne(() => Category, (category) => category.productCategory)
    category: Category;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.productCategory)
    product: Product;
}