import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StaffAccount } from './staffAccounts';

@ObjectType()
@Entity({ name: 'staff_roles' })
export class StaffRole {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    staff_id: string;

    @Field()
    @Column('integer')
    role_id: number;

    @Field(() => [StaffAccount])
    @OneToMany(() => StaffAccount, (staffAccounts) => staffAccounts.staffRole)
    staffAccounts: StaffAccount[];
}
