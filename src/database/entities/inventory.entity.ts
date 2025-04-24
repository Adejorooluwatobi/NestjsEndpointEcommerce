import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('inventory')
export class Inventory {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  productId: string;

  @Field()
  @Column('int')
  stockLevel: number;

  @Field()
  @UpdateDateColumn()
  lastUpdated: Date;
}