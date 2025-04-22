import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'roles' })
export class Role {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ length: 200 })
    roleName: string;

    @Field()
    @Column('text')
    privileges: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

//     @Field()
//     @Column('uuid')
//     createdBy: string;

//     @Field()
//     @Column('uuid')
//     updatedBy: string;
}