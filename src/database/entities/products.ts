import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductCategory } from './productCategories';
import { Variant } from './variants';
import { ProductAttribute } from './productAttributes';
import { Gallery } from './galleries';
import { ProductTag } from './productTags';
import { OrderItem } from './orderItems';
import { ProductShipping } from './productShippings';
import { CardItem } from './cardItems';
import { ProductCoupon } from './productCoupons';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 255 })
    product_name: string;

    @Field()
    @Column({ length: 50 })
    sku: string;

    @Field()
    @Column('numeric')
    regular_price: number;

    @Field()
    @Column('numeric')
    discount_price: number;

    @Field()
    @Column('integer')
    quantity: number;

    @Field()
    @Column({ length: 100 })
    short_description: string;

    @Field()
    @Column('text')
    product_description: string;

    @Field(() => [ProductCoupon])
    @OneToMany(() => ProductCoupon, (productCoupon) => productCoupon.product)
    productCoupons: ProductCoupon[];

    @Field()
    @Column('numeric')
    product_weight: number;

    @Field()
    @Column({ length: 50 })
    product_code: string;

    @Field()
    @Column('boolean')
    published: boolean;

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
    @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
    productCategory: ProductCategory[];

    @Field(() => [Variant])
    @OneToMany(() => Variant, (variant) => variant.product)
    variants: Variant[];

    @Field(() => [ProductAttribute])
    @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.product)
    productAttributes: ProductAttribute[];

    @Field(() => [Gallery])
    @OneToMany(() => Gallery, (galleries) => galleries.product)
    galleries: Gallery[];

    @Field(() => [ProductTag])
    @OneToMany(() => ProductTag, (productTags) => productTags.product)
    productTags: ProductTag[];

    @Field(() => [OrderItem])
    @OneToMany(() => OrderItem, (orderItems) => orderItems.product)
    orderItems: OrderItem[];

    @Field(() => [ProductShipping])
    @OneToMany(() => ProductShipping, (productShippings) => productShippings.product)
    productShippings: ProductShipping[];

    @Field(() => [CardItem])
    @OneToMany(() => CardItem, (cardItems) => cardItems.product)
    cardItems: CardItem[];
}