import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
    @Field() 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field() 
    @Column()
    title: string;

    @Field() 
    @Column()
    description: string;

    @Field(() => User) // Assuming this is a many-to-one relationship with the User entity
    @ManyToOne(() => User, (user) => user.posts,)
    user: User; // Assuming this is a many-to-one relationship with the User entity

    // @Column({ nullable: true })
    // authorId: string; // Assuming this is a foreign key referencing the User entity

    @Field() 
    @Column({ default: true })
    isActive: boolean;

    @Field() 
    @Column({ default: new Date() })
    createdAt: Date;

    @Field() 
    @Column({ default: new Date() })
    updatedAt: Date;
}