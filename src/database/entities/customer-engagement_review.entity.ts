import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('reviews')
export class Review {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Field()
  @Column()
  productId: string;

  @Field()
  @Column()
  customerId: string;

  @Field()
  @Column('int')
  rating: number;

  @Field()
  @Column()
  comment: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date; 
}