import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'notifications' })
export class Notification {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    accountId: string;

    @Field()
    @Column({ length: 100 })
    title: string;

    @Field()
    @Column('text')
    content: string;

    @Field()
    @Column('boolean')
    read: boolean;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column('timestamp')
    receive_time: Date;

    @Field()
    @Column('date')
    notification_expiryDate: Date;
}