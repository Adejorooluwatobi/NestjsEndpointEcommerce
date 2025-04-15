import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StaffAccount } from './staffAccounts.entity';

@ObjectType()
@Entity({ name: 'staff_roles' })
export class StaffRole {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column('uuid')
    staffId: string;

    @Field()
    @Column('uuid')
    roleId: string;

    @Field(() => [StaffAccount])
    @OneToMany(() => StaffAccount, (staffAccounts) => staffAccounts.staffRole)
    staffAccounts: StaffAccount[];
}
