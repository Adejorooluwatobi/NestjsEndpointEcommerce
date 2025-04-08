import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductCategory } from './productCategories';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    parent_id: string;

    @Field()
    @Column({ length: 200 })
    category_name: string;

    @Field()
    @Column('text')
    category_description: string;

    @Field()
    @Column('text')
    icon: string;

    @Field()
    @Column('text')
    image_path: string;

    @Field()
    @Column('boolean')
    active: boolean;

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

    @Field(() => [ProductCategory])
    @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
    productCategory: ProductCategory[];
}