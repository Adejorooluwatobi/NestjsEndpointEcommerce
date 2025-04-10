import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StaffRole } from './staffRoles.entity';

@ObjectType()
@Entity({ name: 'staff_accounts' })
export class StaffAccount {
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
    phoneNumber: string;

    @Field()
    @Column({ length: 255 })
    email: string;

    @Field()
    @Column('text')
    passwordHash: string;

    @Field()
    @Column('boolean')
    active: boolean;

    @Field()
    @Column('text')
    profileImg: string;

    @Field()
    @CreateDateColumn()
    registeredAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column('uuid')
    createdBy: string;

    @Field()
    @Column('uuid')
    updatedBy: string;

    @Field(() => StaffRole)
    @ManyToOne(() => StaffRole, (staffRole) => staffRole.staffAccounts)
    staffRole: StaffRole;
}
