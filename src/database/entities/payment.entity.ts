import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Order } from './orders.entity';
import { Customer } from './customers.entity';

@ObjectType()
@Entity('payments')
export class Payment {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  orderId: string;

  @Field()
  @Column()
  customerId: string;

  @Field()
  @Column()
  paymentMethod: string;

  @Field()
  @Column('decimal')
  amount: number;

  @Field()
  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed';

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ nullable: true })
  refundedAt: Date;

  @Field(() => Order) // Explicitly specify the type for GraphQL
  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @Field(() => Customer) // Explicitly specify the type for GraphQL
  @ManyToOne(() => Customer, (customer) => customer.payments)
  customer: Customer;
}