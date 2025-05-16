import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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
  @Column('integer')
  stock: number;

  @Field()
  @Column('int')
  stockLevel: number;

  @Field()
  @Column('integer', { default: 0 })
  reservedStock: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  lastUpdated: Date;
}