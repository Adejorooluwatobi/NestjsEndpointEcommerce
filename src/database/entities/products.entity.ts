import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { ProductCategory } from './productCategories.entity';
// import { Variant } from './variants.entity';
// import { ProductAttribute } from './productAttributes.entity';
// import { Gallery } from './galleries.entity';
// import { ProductTag } from './productTags.entity';
// import { OrderItem } from './orderItems.entity';
// import { ProductShipping } from './productShippings.entity';
// import { CardItem } from './cardItems.entity';
// import { ProductCoupon } from './productCoupons.entity';

@ObjectType()
@Entity({ name: 'products' })
export class Product {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 255 })
    productName: string;

    @Field()
    @Column({ length: 50 })
    sku: string;

    @Field()
    @Column('numeric')
    regularPrice: number;

    @Field()
    @Column('numeric')
    discountPrice: number;

    @Field()
    @Column('integer')
    quantity: number;

    @Field()
    @Column({ length: 100 })
    shortDescription: string;

    @Field()
    @Column('text')
    productDescription: string;

    // @Field(() => [ProductCoupon])
    // @OneToMany(() => ProductCoupon, (productCoupon) => productCoupon.product)
    // productCoupons: ProductCoupon[];

    @Field()
    @Column('numeric')
    productWeight: number;

    @Field()
    @Column({ length: 50 })
    productCode: string;

    @Field()
    @Column('boolean')
    published: boolean;

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

    // @Field(() => [ProductCategory])
    // @OneToMany(() => ProductCategory, (productCategory) => productCategory.product)
    // productCategory: ProductCategory[];

    // @Field(() => [Variant])
    // @OneToMany(() => Variant, (variant) => variant.product)
    // variants: Variant[];

    // @Field(() => [ProductAttribute])
    // @OneToMany(() => ProductAttribute, (productAttributes) => productAttributes.product)
    // productAttributes: ProductAttribute[];

    // @Field(() => [Gallery])
    // @OneToMany(() => Gallery, (galleries) => galleries.product)
    // galleries: Gallery[];

    // @Field(() => [ProductTag])
    // @OneToMany(() => ProductTag, (productTags) => productTags.product)
    // productTags: ProductTag[];

    // @Field(() => [OrderItem])
    // @OneToMany(() => OrderItem, (orderItems) => orderItems.product)
    // orderItems: OrderItem[];

    // @Field(() => [ProductShipping])
    // @OneToMany(() => ProductShipping, (productShippings) => productShippings.product)
    // productShippings: ProductShipping[];

    // @Field(() => [CardItem])
    // @OneToMany(() => CardItem, (cardItems) => cardItems.product)
    // cardItems: CardItem[];
}