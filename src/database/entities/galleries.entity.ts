import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';
// import { Product } from './products.entity';

@ObjectType()
@Entity({ name: 'galleries' })
export class Gallery {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    productId: string;

    @Field()
    @Column('text')
    imagePath: string;

    @Field()
    @Column('text')
    thumbnail: string;

    @Field()
    @Column('boolean')
    displayOrder: boolean;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    // @Field()
    // @Column('uuid')
    // createdBy: string;

    // @Field()
    // @Column('uuid')
    // updatedBy: string;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.galleries)
    product: Product;
}