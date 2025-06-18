import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('wishlists')
export class Wishlist {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  customerId: string;

  @Field()
  @Column()
  productId: string;

  @Field()
  @CreateDateColumn()
  addedAt: Date;
}