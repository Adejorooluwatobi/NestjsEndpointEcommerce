import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductTag } from './productTags.entity';

@ObjectType()
@Entity({ name: 'tags' })
export class Tag {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    tagName: string;

    @Field()
    @Column('text')
    icon: string;

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

    @Field(() => [ProductTag])
    @OneToMany(() => ProductTag, (productTag) => productTag.tag)
    productTags: ProductTag[];
}