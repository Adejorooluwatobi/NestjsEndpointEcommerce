import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Order } from './orders.entity';
import { Card } from './cards.entity';
import { Profile } from './Profile.entity';
import { CustomerAddress } from './customerAddresses.entity';

@ObjectType()
@Entity({ name: 'customers' })
export class Customer {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 100 })
    firstName: string;

    @Field()
    @Column({ length: 100 })
    lastName: string;

    @Field()
    @Column({ length: 100 })
    userName: string;

    @Field()
    @Column({ length: 255 })
    phoneNumber: string;

    @Field()
    @Column({ length: 255 })
    email: string;

    @Field()
    @Column('text')
    password: string;

    @Field()
    @Column({ default: false })
    isActive: boolean;

    @Field()
    @CreateDateColumn()
    registeredAt: Date;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Profile, { nullable: true })
    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @Field(() => [Order])
    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @Field(() => [Card])
    @OneToMany(() => Card, (card) => card.customer)
    cards: Card[];

    @OneToOne(() => CustomerAddress, { cascade: true })
    @JoinColumn()
    customerAddress: CustomerAddress;
}
