import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Product } from './products';

@ObjectType()
@Entity({ name: 'galleries' })
export class Gallery {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    product_id: string;

    @Field()
    @Column('text')
    image_path: string;

    @Field()
    @Column('text')
    thumbnail: string;

    @Field()
    @Column('boolean')
    display_order: boolean;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field()
    @UpdateDateColumn()
    updated_at: Date;

    @Field()
    @Column('uuid')
    created_by: string;

    @Field()
    @Column('uuid')
    updated_by: string;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.galleries)
    product: Product;
}