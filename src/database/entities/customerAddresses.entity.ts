import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'customer_addresses' })
export class CustomerAddress {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Field()
    // @Column('uuid')
    // customerId: string;

    @Field()
    @Column('text')
    address_line1: string;

    @Field()
    @Column('text')
    address_line2: string;

    @Field()
    @Column({ length: 100 })
    postalCode: string;

    @Field()
    @Column({ length: 200 })
    country: string;

    @Field()
    @Column({ length: 200 })
    city: string;

    @Field()
    @Column({ length: 200 })
    phoneNumber: string;
}