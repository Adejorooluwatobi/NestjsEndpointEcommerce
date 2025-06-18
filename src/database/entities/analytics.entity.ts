import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity('analytics')
export class Analytics {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column()
  metric: string; // Name of the metric (e.g., "total_sales", "active_users")

  @Field()
  @Column('decimal', { nullable: true })
  value: number; // Value of the metric (e.g., sales amount, user count)

  @Field(() => String)
  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>; // Additional data related to the metric

  @Field()
  @CreateDateColumn()
  recordedAt: Date; // When the metric was recorded
}