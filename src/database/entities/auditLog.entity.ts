import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'audit_logs' })
export class AuditLog {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('uuid')
  userId: string;

  @Field()
  @Column('uuid')
  staffId: string;

  @Field()
  @Column('text')
  action: string;

  @Field()
  @Column('text')
  details: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}