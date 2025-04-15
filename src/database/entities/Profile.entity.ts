// Removed unused import from "express"
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: "user_profile" })
export class Profile {
    @Field() 
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Field() 
    @Column()
    phoneNumber: string;

    @Field() 
    @Column()
    address: string;

    @Field() 
    @Column()
    city: string;

    @Field() 
    @Column()
    state: string;

    @Field() 
    @Column()
    country: string;

    @Field() 
    @Column()
    postalCode: string;
    
    @Field() 
    @Column()
    dateOfBirth: Date;

    @Field() 
    @CreateDateColumn()
    createdAt: Date;

    @Field() 
    @UpdateDateColumn()
    updatedAt: Date;

}