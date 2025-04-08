import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ProductTag } from './productTags';

@ObjectType()
@Entity({ name: 'tags' })
export class Tag {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    tag_name: string;

    @Field()
    @Column('text')
    icon: string;

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

    @Field(() => [ProductTag])
    @OneToMany(() => ProductTag, (productTag) => productTag.tag)
    productTags: ProductTag[];
}