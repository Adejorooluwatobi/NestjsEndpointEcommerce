import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";

@ObjectType()
@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstname: string;

    @Field()
    @Column()
    lastname: string;

    @Field()
    @Column({ nullable: true }) // optional field
    username: string;

    @Field()
    @Column({ default: false }) // optional field
    isAdmin: boolean;

    @Field()
    @Column({ unique: true }) // unique constraint for email
    email: string;

    @Field()
    @Column()
    password: string;

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

    @Field(() => [Post])
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]; // Assuming a user can have multiple posts
}