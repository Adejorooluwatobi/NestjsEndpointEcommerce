import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'slidebanners' })
export class SlideBanner {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    destinationId: string;

    @Field()
    @Column('text')
    image: string;

    @Field()
    @Column('text')
    title: string;

    @Field()
    @Column('smallint')
    clicks: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid', { nullable: true }) // Track who created the coupon
    createdBy: string;

    @Field()
    @Column('uuid', { nullable: true }) // Track who last updated the coupon
    updatedBy: string;
}