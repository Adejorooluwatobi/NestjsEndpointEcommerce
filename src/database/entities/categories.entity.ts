import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductCategory } from './productCategories.entity';

@ObjectType()
@Entity({ name: 'categories' })
export class Category {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    parentId: string;

    @Field()
    @Column({ length: 200 })
    categoryName: string;

    @Field()
    @Column('text')
    categoryDescription: string;

    @Field()
    @Column('text')
    icon: string;

    @Field()
    @Column('text')
    imagePath: string;

    @Field()
    @Column('boolean')
    isActive: boolean;;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid')
    createdBy: string;

    @Field()
    @Column('uuid')
    updatedBy: string;

    @Field(() => [ProductCategory])
    @OneToMany(() => ProductCategory, (productCategory) => productCategory.category)
    productCategory: ProductCategory[];
}